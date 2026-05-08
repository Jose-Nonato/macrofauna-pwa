import { useEffect, useState } from "react";
import { PlusCircle, MapPin, CalendarDays, ChartColumn } from "lucide-react";
import SampleForm from "../../components/SampleForms/SampleForms";
import { getSamples, deleteSample } from "../../services/SamplesServices";
import { showError, showSuccess } from "../../utils/alert";
import {
  drawer,
  overlay,
  Button,
  PageContainer,
  SampleContainer,
} from "./styles";

export default function SamplesPage() {
  const [samples, setSamples] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(null);

  const [filters, setFilters] = useState({
    country: "",
    state: "",
    city: "",
    startDate: "",
    endDate: "",
  });

  async function loadSamples() {
    try {
      const data = await getSamples();
      setSamples(data);
    } catch (error) {
      showError("Erro ao carregar amostras");
    }
  }

  useEffect(() => {
    loadSamples();
  }, []);

  function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters({
      country: "",
      state: "",
      city: "",
      startDate: "",
      endDate: "",
    });
  }

  const filteredSamples = samples.filter((sample) => {
    const countryMatch =
      !filters.country ||
      sample.country?.toLowerCase().includes(filters.country.toLowerCase());

    const stateMatch =
      !filters.state ||
      sample.state?.toLowerCase().includes(filters.state.toLowerCase());

    const cityMatch =
      !filters.city ||
      sample.city?.toLowerCase().includes(filters.city.toLowerCase());

    const sampleDate = new Date(sample.created_at);

    const startDateMatch =
      !filters.startDate || sampleDate >= new Date(filters.startDate);

    const endDateMatch =
      !filters.endDate || sampleDate <= new Date(filters.endDate + "T23:59:59");

    return (
      countryMatch && stateMatch && cityMatch && startDateMatch && endDateMatch
    );
  });

  function handleCreate() {
    setSelected(null);
    setOpen(true);
  }

  function handleEdit(sample) {
    setSelected(sample);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setSelected(null);
  }

  function handleSaved() {
    handleClose();
    loadSamples();
  }

  async function handleDelete(sampleId) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta amostra?",
    );

    if (!confirmDelete) return;

    try {
      setLoadingDelete(sampleId);

      await deleteSample(sampleId);

      showSuccess("Amostra removida com sucesso");

      loadSamples();
    } catch (error) {
      showError("Erro ao remover amostra");
    } finally {
      setLoadingDelete(null);
    }
  }

  return (
    <PageContainer>
      <div className="topHeader">
        <div>
          <h2>Amostras</h2>
          <p>Gerencie suas amostras cadastradas</p>
        </div>
        <Button onClick={handleCreate}>
          <PlusCircle size={18} />
          Nova Amostra
        </Button>
      </div>
      <div className="filters">
        <div className="filterItem">
          <label>País</label>
          <input
            type="text"
            name="country"
            placeholder="Digite o país"
            value={filters.country}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filterItem">
          <label>Estado</label>
          <input
            type="text"
            name="state"
            placeholder="Digite o estado"
            value={filters.state}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filterItem">
          <label>Cidade</label>
          <input
            type="text"
            name="city"
            placeholder="Digite a cidade"
            value={filters.city}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filterItem">
          <label>Data Inicial</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filterItem">
          <label>Data Final</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>
        <button className="clearFilters" onClick={clearFilters}>
          Limpar
        </button>
      </div>
      <SampleContainer>
        {filteredSamples.map((s) => (
          <div key={s.id} className="card">
            <div className="cardHeader">
              <div>
                <h3 className="cardTitle">
                  <MapPin size={18} />
                  {s.city}, {s.state}
                </h3>
                <p className="country">{s.country}</p>
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(s)} className="editBtn">
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  disabled={loadingDelete === s.id}
                  className="removeBtn"
                >
                  {loadingDelete === s.id ? "Removendo..." : "Excluir"}
                </button>
              </div>
            </div>
            <div className="content">
              <div className="infoRow">
                <ChartColumn size={18} />
                <span>
                  Densidade: <strong>{s.sample_density}</strong>
                </span>
              </div>
              <div className="infoRow">
                <span>
                  Score: <strong>{s.sample_score}</strong>
                </span>
              </div>
              <div className="infoRow">
                <CalendarDays size={18} />
                <span>
                  Criado em: <strong>{formatDate(s.created_at)}</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </SampleContainer>
      {open && (
        <div style={overlay}>
          <div style={drawer}>
            <SampleForm
              initialData={selected}
              onClose={handleClose}
              onSaved={handleSaved}
            />
          </div>
        </div>
      )}
    </PageContainer>
  );
}

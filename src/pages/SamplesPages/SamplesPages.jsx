import { useEffect, useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import SampleForm from "../../components/SampleForms/SampleForms";
import { getSamples, deleteSample } from "../../services/SamplesServices";
import { showError, showSuccess } from "../../utils/alert";
import { card, drawer, overlay, Button, SampleContainer } from "./styles";

export default function SamplesPage() {
  const [samples, setSamples] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(null);

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
    <div style={{ padding: 20 }}>
      <h2>Amostras</h2>

      <Button onClick={handleCreate}>
        <PlusCircle />
        Nova Amostra
      </Button>

      <SampleContainer style={{ marginTop: 20 }}>
        {samples.map((s) => (
          <div key={s.id} style={card}>
            <p>{s.sample_density}</p>
            <p>{s.sample_score}</p>
            <p>{s.country}</p>
            <p>{s.state}</p>
            <p>{s.city}</p>
            <p>{s.created_at}</p>
            <div>
              <button onClick={() => handleEdit(s)}>Editar</button>
              <button
                onClick={() => handleDelete(s.id)}
                disabled={loadingDelete === s.id}
                style={{ background: "#ef4444", color: "#fff" }}
              >
                <Trash2 size={16} />
                {loadingDelete === s.id ? "Removendo..." : "Excluir"}
              </button>
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
    </div>
  );
}

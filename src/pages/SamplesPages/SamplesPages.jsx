import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import SampleForm from "../../components/SampleForms/SampleForms";
import { getSamples } from "../../services/SamplesServices";
import { card, drawer, overlay, Button } from "./styles";

export default function SamplesPage() {
  const [samples, setSamples] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  async function loadSamples() {
    const data = await getSamples();
    setSamples(data);
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

  return (
    <div style={{ padding: 20 }}>
      <h2>Amostras</h2>

      <Button onClick={handleCreate}>
        <PlusCircle />
        Nova Amostra
      </Button>

      <div style={{ marginTop: 20 }}>
        {samples.map((s) => (
          <div key={s.id} style={card}>
            <strong>ID:</strong> {s.id} <br />
            <strong>Densidade:</strong> {s.sample_density} <br />
            <strong>IQMS:</strong> {s.sample_score} <br />
            <strong>Cidade:</strong> {s.city}
            <div style={{ marginTop: 10 }}>
              <button onClick={() => handleEdit(s)}>Editar</button>
            </div>
          </div>
        ))}
      </div>

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

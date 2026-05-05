import { useEffect, useState } from "react";
import SampleMap from "../../components/SampleMap/SampleMap";
import { getSamples } from "../../services/SamplesServices";

export default function Maps() {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSamples() {
    try {
      setLoading(true);
      const data = await getSamples();
      setSamples(data || []);
    } catch (error) {
      console.error("Erro ao carregar amostras:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSamples();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Carregando mapa...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Mapa de Amostras</h2>

      <div style={{ marginTop: 20 }}>
        <SampleMap samples={samples} />
      </div>
    </div>
  );
}

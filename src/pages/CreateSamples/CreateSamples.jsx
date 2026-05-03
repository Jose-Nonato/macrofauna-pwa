import {
  getCurrentPosition,
  reverseCoordenates,
} from "../../utils/geolocation";
import { createSample, insertInsects } from "../../services/SamplesServices";
import { showError, showSuccess } from "../../utils/alert";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Grid,
  Info,
  Input,
  Row,
  Submit,
} from "./styles";

const KEYS = [
  "EW",
  "AN",
  "TER",
  "BLA",
  "COL",
  "ARA",
  "DIPLO",
  "CHI",
  "HEMI",
  "DER",
  "LEP",
  "GAS",
  "OT",
];

const WEIGHTS = {
  EW: 19.2,
  AN: 17.5,
  TER: 20.9,
  BLA: 9.8,
  COL: 20.4,
  ARA: 17.5,
  DIPLO: 20.1,
  CHI: 21.8,
  HEMI: 13.5,
  DER: 8.9,
  LEP: 15.5,
  GAS: 16.7,
  OT: 21.9,
};

export default function CreateSamples() {
  const [samples, setSamples] = useState([createEmpty()]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    country: "",
    state: "",
    city: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    loadLocation();
  }, []);

  async function loadLocation() {
    try {
      setLoading(true);
      const coords = await getCurrentPosition();
      const location = await reverseCoordenates(
        coords.latitude,
        coords.longitude,
      );

      setForm((prev) => ({
        ...prev,
        latitude: coords.latitude,
        longitude: coords.longitude,
        country: location.country,
        state: location.state,
        city: location.city,
      }));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  function createEmpty() {
    return {
      ...Object.fromEntries(KEYS.map((k) => [k, 0])),
      density: 0,
      iqms: 0,
    };
  }

  function handleChange(index, key, value) {
    setSamples((prev) => {
      const updated = [...prev];
      const s = { ...updated[index], [key]: Number(value) };

      const total = KEYS.reduce((sum, k) => sum + (s[k] || 0), 0);
      const rawDensity = total * 16;
      const logDensity = Math.log10(rawDensity + 1);
      s.density = Number(logDensity.toFixed(2));

      const rt = KEYS.filter((k) => (s[k] || 0) > 0).length;

      let iqmsSum = 0;
      KEYS.forEach((k) => {
        const val = s[k] || 0;
        if (val > 0) iqmsSum += Math.log10(WEIGHTS[k] * val);
      });

      if (s.density > 0) iqmsSum += Math.log10(31.8 * s.density);
      if (rt > 0) iqmsSum += Math.log10(31.8 * rt);

      s.iqms = Number((iqmsSum * 0.0014 + 0.1).toFixed(2));

      updated[index] = s;
      return updated;
    });
  }

  function addSample() {
    setSamples((prev) => [...prev, createEmpty()]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const avgDensity =
        samples.reduce((sum, s) => sum + s.density, 0) / samples.length;

      const avgIqms =
        samples.reduce((sum, s) => sum + s.iqms, 0) / samples.length;

      const sample = await createSample({
        sample_density: avgDensity,
        sample_score: avgIqms,
        ...form,
      });

      const insects = samples.map((s) => ({
        sample_id: sample.id,
        sample_density: s.density,
        iqms: s.iqms,
        earthworm: s.EW,
        ant: s.AN,
        isoptera: s.TER,
        blattaria: s.BLA,
        coleoptera: s.COL,
        arachnida: s.ARA,
        diplopoda: s.DIPLO,
        chilopoda: s.CHI,
        hemiptera: s.HEMI,
        dermaptera: s.DER,
        lepidoptera: s.LEP,
        gasteropoda: s.GAS,
        others: s.OT,
      }));

      await insertInsects(insects);

      showSuccess("Amostra criada com sucesso!");
    } catch (error) {
      showError("Erro ao criar amostra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h2>Nova Amostra</h2>

      {loading && <p>Carregando...</p>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Input value={form.country} readOnly />
          <Input value={form.state} readOnly />
          <Input value={form.city} readOnly />
        </Row>

        {samples.map((s, i) => (
          <Card key={i}>
            <h3>Amostra {i + 1}</h3>
            <Grid>
              {KEYS.map((k) => (
                <Input
                  key={k}
                  type="number"
                  placeholder={k}
                  value={s[k]}
                  onChange={(e) => handleChange(i, k, e.target.value)}
                />
              ))}
            </Grid>
            <Info>
              Density: {s.density} | IQMS: {s.iqms}
            </Info>
          </Card>
        ))}

        <Button type="button" onClick={addSample} disabled={loading}>
          + Adicionar Amostra
        </Button>

        <Submit type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Submit>
      </Form>
    </Container>
  );
}

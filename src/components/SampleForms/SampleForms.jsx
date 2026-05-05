import { useEffect, useState } from "react";
import {
  getCurrentPosition,
  reverseCoordenates,
} from "../../utils/geolocation";
import {
  createSample,
  updateSample,
  insertInsects,
  getInsectsBySample,
} from "../../services/SamplesServices";
import { supabase } from "../../lib/supabase";
import { showError, showSuccess } from "../../utils/alert";
import {
  Card,
  Container,
  Title,
  CardSample,
  AddButton,
  ButtonDisposition,
} from "./styles";

const FIELDS = [
  { label: "Earthworm (EW)", subtitle: "Minhoca", key: "EW" },
  { label: "Ant (AN)", subtitle: "Formiga", key: "AN" },
  { label: "Isoptera (TER)", subtitle: "Cupins", key: "TER" },
  { label: "Blattaria (BLA)", subtitle: "Barata", key: "BLA" },
  { label: "Coleoptera (COL)", subtitle: "Besouro", key: "COL" },
  { label: "Arachnida (ARA)", subtitle: "Aranha", key: "ARA" },
  { label: "Diplopoda (DIPLO)", subtitle: "Diplópode", key: "DIPLO" },
  { label: "Chilopoda (CHI)", subtitle: "Quilópode", key: "CHI" },
  { label: "Hemiptera (HEMI)", subtitle: "Percevejo", key: "HEMI" },
  { label: "Dermaptera (DER)", subtitle: "Tesourinha", key: "DER" },
  { label: "Lepidoptera (LEP)", subtitle: "Lagarta", key: "LEP" },
  { label: "Gasteropoda (GAS)", subtitle: "Caracóis e Lesmas", key: "GAS" },
  { label: "Outros (OT)", subtitle: "Outros", key: "OT" },
];

const KEYS = FIELDS.map((f) => f.key);

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

export default function SampleForm({ initialData, onClose, onSaved }) {
  const [samples, setSamples] = useState([createEmpty()]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    country: "",
    state: "",
    city: "",
    latitude: "",
    longitude: "",
  });

  const isEdit = !!initialData?.id;

  useEffect(() => {
    if (initialData) {
      loadEditData();
    } else {
      loadLocation();
    }
  }, [initialData]);

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

  async function loadEditData() {
    try {
      setLoading(true);

      setForm({
        country: initialData.country,
        state: initialData.state,
        city: initialData.city,
        latitude: initialData.latitude,
        longitude: initialData.longitude,
      });

      const insects = await getInsectsBySample(initialData.id);

      if (!insects || insects.length === 0) {
        setSamples([createEmpty()]);
        return;
      }

      const mapped = insects.map((i) => ({
        EW: i.earthworm || 0,
        AN: i.ant || 0,
        TER: i.isoptera || 0,
        BLA: i.blattaria || 0,
        COL: i.coleoptera || 0,
        ARA: i.arachnida || 0,
        DIPLO: i.diplopoda || 0,
        CHI: i.chilopoda || 0,
        HEMI: i.hemiptera || 0,
        DER: i.dermaptera || 0,
        LEP: i.lepidoptera || 0,
        GAS: i.gasteropoda || 0,
        OT: i.others || 0,
        density: i.sample_density || 0,
        iqms: i.iqms || 0,
      }));

      setSamples(mapped);
    } catch (error) {
      showError("Erro ao carregar dados da amostra");
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

      let sample;

      if (isEdit) {
        sample = await updateSample(initialData.id, {
          sample_density: avgDensity,
          sample_score: avgIqms,
          ...form,
        });
      } else {
        sample = await createSample({
          sample_density: avgDensity,
          sample_score: avgIqms,
          ...form,
        });
      }

      if (!sample?.id) throw new Error("Erro ao salvar");

      if (isEdit) {
        await supabase.from("insect").delete().eq("sample_id", sample.id);
      }

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

      showSuccess(isEdit ? "Amostra atualizada!" : "Amostra criada!");

      onSaved?.();
    } catch (error) {
      showError("Erro ao salvar amostra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h2>{isEdit ? "Editar Amostra" : "Nova Amostra"}</h2>

      {loading && <p>Carregando...</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input value={form.country} readOnly />
          <input value={form.state} readOnly />
          <input value={form.city} readOnly />
        </div>
        {samples.map((s, i) => (
          <Card key={i}>
            <Title>Amostra {i + 1}</Title>
            <div>
              {FIELDS.map((f) => (
                <CardSample key={f.key}>
                  <div className="internalCard">
                    <img src="/icones/Asset 3@3x.png" />
                    <div className="titleCard">
                      <label>{f.label}</label>
                      <span>{f.subtitle}</span>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={s[f.key]}
                    onChange={(e) => handleChange(i, f.key, e.target.value)}
                  />
                </CardSample>
              ))}
            </div>
            {/* <p>
              Density: {s.density} | IQMS: {s.iqms}
            </p> */}
          </Card>
        ))}
        <AddButton type="button" onClick={addSample} disabled={loading}>
          Adicionar Amostra
        </AddButton>
        <ButtonDisposition style={{ marginTop: 10 }}>
          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : isEdit ? "Atualizar" : "Salvar"}
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </ButtonDisposition>
      </form>
    </Container>
  );
}

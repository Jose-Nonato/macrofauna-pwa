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
  modalStyle,
  overlayStyle,
} from "./styles";

const SPECIES_INFO = {
  EW: {
    name: "Minhoca",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp_lc6NMrY8XVTaRVpe7fsYOzFV2HjMUrPg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLidOrD6gGIncQuMHSOrek_wfMLe-Dk0RhSA&s",
    ],
    description:
      "Minhocas são fundamentais para a estrutura e fertilidade do solo.",
  },
  AN: {
    name: "Formiga",
    images: ["https://upload.wikimedia.org/wikipedia/commons/3/30/Ant.jpg"],
    description: "Formigas contribuem para a ciclagem de nutrientes.",
  },
  TER: {
    name: "Cupim",
    images: [],
    description: "Cupins atuam na decomposição de matéria orgânica.",
  },
  BLA: {
    name: "Barata",
    images: [],
    description: "Baratas participam da decomposição.",
  },
  COL: {
    name: "Besouro",
    images: [],
    description: "Besouros possuem diversas funções ecológicas.",
  },
  ARA: {
    name: "Aranha",
    images: [],
    description: "Aranhas são predadoras importantes.",
  },
  DIPLO: {
    name: "Diplópode",
    images: [],
    description: "Diplópodes ajudam na decomposição.",
  },
  CHI: {
    name: "Quilópode",
    images: [],
    description: "Quilópodes são predadores do solo.",
  },
  HEMI: {
    name: "Percevejo",
    images: [],
    description: "Percevejos possuem variados hábitos.",
  },
  DER: {
    name: "Tesourinha",
    images: [],
    description: "Tesourinhas são onívoras.",
  },
  LEP: {
    name: "Lagarta",
    images: [],
    description: "Lagartas são herbívoras importantes.",
  },
  GAS: {
    name: "Moluscos",
    images: [],
    description: "Moluscos participam da decomposição.",
  },
  OT: { name: "Outros", images: [], description: "Outros organismos do solo." },
};

const FIELDS = [
  {
    label: "Earthworm (EW)",
    subtitle: "Minhoca",
    key: "EW",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Ant (AN)",
    subtitle: "Formiga",
    key: "AN",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Isoptera (TER)",
    subtitle: "Cupins",
    key: "TER",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Blattaria (BLA)",
    subtitle: "Barata",
    key: "BLA",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Coleoptera (COL)",
    subtitle: "Besouro",
    key: "COL",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Arachnida (ARA)",
    subtitle: "Aranha",
    key: "ARA",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Diplopoda (DIPLO)",
    subtitle: "Diplópode",
    key: "DIPLO",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Chilopoda (CHI)",
    subtitle: "Quilópode",
    key: "CHI",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Hemiptera (HEMI)",
    subtitle: "Percevejo",
    key: "HEMI",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Dermaptera (DER)",
    subtitle: "Tesourinha",
    key: "DER",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Lepidoptera (LEP)",
    subtitle: "Lagarta",
    key: "LEP",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Gasteropoda (GAS)",
    subtitle: "Caracóis e Lesmas",
    key: "GAS",
    image_path: "/icones/Asset 3@3x.png",
  },
  {
    label: "Outros (OT)",
    subtitle: "Outros",
    key: "OT",
    image_path: "/icones/Asset 3@3x.png",
  },
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
  const [modal, setModal] = useState({ open: false, key: null, index: 0 });

  const [form, setForm] = useState({
    country: "",
    state: "",
    city: "",
    latitude: "",
    longitude: "",
  });

  const isEdit = !!initialData?.id;

  useEffect(() => {
    if (initialData) loadEditData();
    else loadLocation();
  }, [initialData]);

  async function loadLocation() {
    try {
      setLoading(true);
      const coords = await getCurrentPosition();
      const location = await reverseCoordenates(
        coords.latitude,
        coords.longitude,
      );

      setForm({
        country: location.country,
        state: location.state,
        city: location.city,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
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

      setSamples(mapped.length ? mapped : [createEmpty()]);
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
      const logDensity = Math.log10(total * 16 + 1);
      s.density = Number(logDensity.toFixed(2));

      const rt = KEYS.filter((k) => (s[k] || 0) > 0).length;

      let iqms = 0;
      KEYS.forEach((k) => {
        if (s[k] > 0) iqms += Math.log10(WEIGHTS[k] * s[k]);
      });

      if (s.density > 0) iqms += Math.log10(31.8 * s.density);
      if (rt > 0) iqms += Math.log10(31.8 * rt);

      s.iqms = Number((iqms * 0.0014 + 0.1).toFixed(2));

      updated[index] = s;
      return updated;
    });
  }

  function addSample() {
    setSamples((prev) => [...prev, createEmpty()]);
  }

  function removeSample(index) {
    setSamples((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index),
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const avgDensity =
        samples.reduce((s, v) => s + v.density, 0) / samples.length;
      const avgIqms = samples.reduce((s, v) => s + v.iqms, 0) / samples.length;

      const sample = isEdit
        ? await updateSample(initialData.id, {
            sample_density: avgDensity,
            sample_score: avgIqms,
            ...form,
          })
        : await createSample({
            sample_density: avgDensity,
            sample_score: avgIqms,
            ...form,
          });

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
    } catch {
      showError("Erro ao salvar amostra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h2>{isEdit ? "Editar Amostra" : "Nova Amostra"}</h2>

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
                    <img
                      src={f.image_path}
                      onClick={() =>
                        setModal({ open: true, key: f.key, index: 0 })
                      }
                      style={{ cursor: "pointer" }}
                    />
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

            <ButtonDisposition>
              <button
                type="button"
                onClick={() => removeSample(i)}
                disabled={samples.length === 1}
              >
                Remover Amostra
              </button>
            </ButtonDisposition>
          </Card>
        ))}

        <AddButton type="button" onClick={addSample}>
          Adicionar Amostra
        </AddButton>

        <ButtonDisposition>
          <button type="submit">{loading ? "Salvando..." : "Salvar"}</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </ButtonDisposition>
      </form>

      {modal.open && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button onClick={() => setModal({ open: false })}>X</button>

            <h3>{SPECIES_INFO[modal.key]?.name}</h3>

            {SPECIES_INFO[modal.key]?.images.length > 0 && (
              <img
                src={SPECIES_INFO[modal.key].images[modal.index]}
                style={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
              />
            )}

            <p>{SPECIES_INFO[modal.key]?.description}</p>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() =>
                  setModal((m) => ({
                    ...m,
                    index:
                      m.index === 0
                        ? SPECIES_INFO[m.key].images.length - 1
                        : m.index - 1,
                  }))
                }
              >
                ◀
              </button>

              <button
                onClick={() =>
                  setModal((m) => ({
                    ...m,
                    index: (m.index + 1) % SPECIES_INFO[m.key].images.length,
                  }))
                }
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

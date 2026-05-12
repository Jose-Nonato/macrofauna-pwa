import { useEffect, useState } from "react";
import PhotoUploader from "../../components/PhotoUploader/PhotoUploader";
import {
  deletePhoto,
  getPhotosBySample,
  uploadPhoto,
} from "../../services/PhotosServices";
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
  LocationContainer,
  ModalDescription,
  ModalHeader,
  ModalImage,
  ModalNavigation,
  SamplesGrid,
} from "./styles";

const SPECIES_INFO = {
  EW: {
    name: "Minhoca",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp_lc6NMrY8XVTaRVpe7fsYOzFV2HjMUrPg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLidOrD6gGIncQuMHSOrek_wfMLe-Dk0RhSA&s",
    ],
    description:
      "Minhocas são fundamentais para a estrutura e fertilidade do solo, promovendo aeração e ciclagem de nutrientes.",
  },
  AN: {
    name: "Formiga",
    images: [
      "https://super.abril.com.br/wp-content/uploads/2013/07/formiga.png?w=720&h=440&crop=1",
      "https://img.odcdn.com.br/wp-content/uploads/2022/06/formiga-de-fogo.jpg",
    ],
    description:
      "Formigas contribuem para a ciclagem de nutrientes, dispersão de sementes e aeração do solo.",
  },
  TER: {
    name: "Cupim",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHdBuLpXORk1C6FEcpicMiFAbK1uzmEGKLjw&s",
      "https://i0.wp.com/cleantec.com.br/wp-content/uploads/2021/11/o-que-sao-isopteras-e-o-impacto-dos-cupins-na-natureza-e-na-economia.jpg",
    ],
    description:
      "Cupins atuam na decomposição de matéria orgânica lignificada, sendo engenheiros fundamentais do ecossistema do solo.",
  },
  BLA: {
    name: "Barata",
    images: [
      "https://kelldrin.com.br/wp-content/uploads/2020/11/barata.jpg",
      "https://agrodedetizadora.com.br/wp-content/uploads/2018/04/barata-1200x600.jpg",
    ],
    description:
      "Baratas participam ativamente da decomposição de matéria orgânica, contribuindo para a reciclagem de nutrientes no solo.",
  },
  COL: {
    name: "Besouro",
    images: [
      "https://terramagna.com.br/wp-content/uploads/2022/07/Femea-besouro-veado-ambiente-natural-galho.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFMKFza6XWB9xA0mkIwbH9PE65eHIfRkh48Q&s",
    ],
    description:
      "Besouros possuem diversas funções ecológicas, incluindo decomposição, predação, polinização e bioturbação do solo.",
  },
  ARA: {
    name: "Aranha",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRshtOWxIsIL3SsCE1NSEQwgZgB6SvP3xdMw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp78wd9S5DSMHRn9UeJ7LS2N0RDhAtN_oRMQ&s",
    ],
    description:
      "Aranhas são predadoras importantes que regulam populações de insetos e outros invertebrados no solo e na vegetação.",
  },
  DIPLO: {
    name: "Diplópode",
    images: [
      "https://t4.ftcdn.net/jpg/00/14/35/33/360_F_14353302_bgLxl9vweLmIMIBgQP5nkkkdrLYrYuR0.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9b-oiH4tPsacsVPSwPwcAZzrOcCxxyiuwjQ&s",
    ],
    description:
      "Diplópodes (piolhos-de-cobra) ajudam na decomposição de resíduos vegetais, fragmentando a serapilheira e acelerando a ciclagem de nutrientes.",
  },
  CHI: {
    name: "Quilópode",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3eiDIqpPqyk_0gsq08QLzbBAjY2gIdlqo4A&s",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Scolopendra_heros_dorsal_view.jpg/250px-Scolopendra_heros_dorsal_view.jpg",
    ],
    description:
      "Quilópodes (centopeias) são predadores ágeis do solo, controlando populações de pequenos invertebrados e contribuindo para o equilíbrio da fauna edáfica.",
  },
  HEMI: {
    name: "Percevejo",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Bed_bug%2C_Cimex_lectularius.jpg/330px-Bed_bug%2C_Cimex_lectularius.jpg",
      "https://www.ferwer.pt/img/blog/prsty-stenice-stadia.webp",
    ],
    description:
      "Percevejos (Hemiptera) possuem variados hábitos alimentares — fitófagos, predadores ou detritívoros — desempenhando papéis distintos nas cadeias tróficas do solo.",
  },
  DER: {
    name: "Tesourinha",
    images: [
      "https://chb.com.br/storage/blog/172801.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCIZuNGI9o8fOwdmwtwHXSO7vGNijH5TDig&s",
    ],
    description:
      "Tesourinhas são onívoras e oportunistas, alimentando-se de matéria orgânica em decomposição, fungos e pequenos invertebrados, contribuindo para o equilíbrio da macrofauna.",
  },
  LEP: {
    name: "Lagarta",
    images: [
      "https://maisagro.syngenta.com.br/media/uploads/2023/11/IMAGEM03-glossario-de-alvos-lagarta-militar_0-1.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Ij7c-n39t57R4V3-SboRM833V8ck7Zujpw&s",
    ],
    description:
      "Lagartas são larvas de lepidópteros herbívoras que influenciam a biomassa vegetal e, quando presentes no solo, contribuem para a bioturbação e ciclagem de matéria orgânica.",
  },
  GAS: {
    name: "Moluscos",
    images: [
      "https://s2.static.brasilescola.uol.com.br/be/2020/11/caracol.jpg",
      "https://static.escolakids.uol.com.br/2020/10/gastropode.jpg",
    ],
    description:
      "Moluscos terrestres (lesmas e caracóis) participam da decomposição de matéria orgânica vegetal e são importantes elos nas cadeias alimentares do solo.",
  },
  OT: {
    name: "Outros",
    images: [
      "https://agrodedetizadora.com.br/wp-content/uploads/2018/04/tatuzinho-1200x600.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR63NaAnowUAsSV5jjSNwkOopWx0TR8RDvryQ&s",
    ],
    description:
      "Outros organismos do solo incluem colêmbolos, ácaros, isópodes e demais invertebrados que desempenham funções ecológicas variadas na macrofauna edáfica.",
  },
};

const FIELDS = [
  {
    label: "Earthworm (EW)",
    subtitle: "Minhoca",
    key: "EW",
    image_path: "/icones/Minhoca.png",
  },
  {
    label: "Ant (AN)",
    subtitle: "Formiga",
    key: "AN",
    image_path: "/icones/Formiga.png",
  },
  {
    label: "Isoptera (TER)",
    subtitle: "Cupins",
    key: "TER",
    image_path: "/icones/Cupins.png",
  },
  {
    label: "Blattaria (BLA)",
    subtitle: "Barata",
    key: "BLA",
    image_path: "/icones/Barata.png",
  },
  {
    label: "Coleoptera (COL)",
    subtitle: "Besouro",
    key: "COL",
    image_path: "/icones/Besouro.png",
  },
  {
    label: "Arachnida (ARA)",
    subtitle: "Aranha",
    key: "ARA",
    image_path: "/icones/Aranha.png",
  },
  {
    label: "Diplopoda (DIPLO)",
    subtitle: "Diplópode",
    key: "DIPLO",
    image_path: "/icones/Diplópode.png",
  },
  {
    label: "Chilopoda (CHI)",
    subtitle: "Quilópode",
    key: "CHI",
    image_path: "/icones/Quilópode.png",
  },
  {
    label: "Hemiptera (HEMI)",
    subtitle: "Percevejo",
    key: "HEMI",
    image_path: "/icones/Percevejo.png",
  },
  {
    label: "Dermaptera (DER)",
    subtitle: "Tesourinha",
    key: "DER",
    image_path: "/icones/Tesourinha.png",
  },
  {
    label: "Lepidoptera (LEP)",
    subtitle: "Lagarta",
    key: "LEP",
    image_path: "/icones/Lagarta.png",
  },
  {
    label: "Gasteropoda (GAS)",
    subtitle: "Caracóis e Lesmas",
    key: "GAS",
    image_path: "/icones/Caracóis e Lesmas.png",
  },
  {
    label: "Outros (OT)",
    subtitle: "Outros",
    key: "OT",
    image_path: "/icones/Outros.png",
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
  const [photos, setPhotos] = useState({
    NORTE: [],
    SUL: [],
    LESTE: [],
    OESTE: [],
  });
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const [form, setForm] = useState({
    country: "",
    state: "",
    city: "",
    latitude: "",
    longitude: "",
  });

  const isEdit = !!initialData?.id;

  useEffect(() => {
    if (!initialData?.id) {
      loadLocation();
      return;
    }

    loadEditData();
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
      if (!initialData?.id) return;

      setLoading(true);

      setForm({
        country: initialData?.country || "",
        state: initialData?.state || "",
        city: initialData?.city || "",
        latitude: initialData?.latitude || "",
        longitude: initialData?.longitude || "",
      });

      const [existingPhotos, insects] = await Promise.all([
        getPhotosBySample(initialData.id),
        getInsectsBySample(initialData.id),
      ]);

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
      setUploadedPhotos(existingPhotos || []);
    } catch (error) {
      console.log(error);
      showError("Erro ao carregar amostra");
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

      for (const direction in photos) {
        const files = photos[direction];

        for (const file of files) {
          await uploadPhoto(file, direction, sample.id);
        }
      }

      showSuccess(isEdit ? "Amostra atualizada!" : "Amostra criada!");
      onSaved?.();
    } catch {
      showError("Erro ao salvar amostra");
    } finally {
      setLoading(false);
    }
  }

  async function removeUploadedPhoto(photoId) {
    try {
      await deletePhoto(photoId);

      setUploadedPhotos((prev) => prev.filter((p) => p.id !== photoId));

      showSuccess("Foto removida");
    } catch {
      showError("Erro ao remover foto");
    }
  }

  return (
    <Container>
      <h2>{isEdit ? "Editar Amostra" : "Nova Amostra"}</h2>

      <form onSubmit={handleSubmit}>
        <LocationContainer>
          <div className="field">
            <label>País</label>
            <input value={form.country} readOnly />
          </div>

          <div className="field">
            <label>Estado</label>
            <input value={form.state} readOnly />
          </div>

          <div className="field">
            <label>Cidade</label>
            <input value={form.city} readOnly />
          </div>
        </LocationContainer>
        <PhotoUploader
          photos={photos}
          setPhotos={setPhotos}
          uploadedPhotos={uploadedPhotos}
          removeUploadedPhoto={removeUploadedPhoto}
        />
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
                        setModal({
                          open: true,
                          key: f.key,
                          index: 0,
                        })
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
            <ModalHeader>
              <h3>{SPECIES_INFO[modal.key]?.name}</h3>

              <button onClick={() => setModal({ open: false })}>✕</button>
            </ModalHeader>

            {SPECIES_INFO[modal.key]?.images.length > 0 && (
              <ModalImage src={SPECIES_INFO[modal.key].images[modal.index]} />
            )}

            <ModalDescription>
              {SPECIES_INFO[modal.key]?.description}
            </ModalDescription>

            <ModalNavigation>
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
                Anterior
              </button>

              <button
                onClick={() =>
                  setModal((m) => ({
                    ...m,
                    index: (m.index + 1) % SPECIES_INFO[m.key].images.length,
                  }))
                }
              >
                Próxima
              </button>
            </ModalNavigation>
          </div>
        </div>
      )}
    </Container>
  );
}

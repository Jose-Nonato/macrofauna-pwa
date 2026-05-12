import { Camera, Upload, Trash2 } from "lucide-react";
import { useRef } from "react";
import { Container, UploadCard, PreviewGrid, PreviewCard } from "./styles";

const DIRECTIONS = [
  {
    key: "NORTE",
    label: "Norte",
  },
  {
    key: "SUL",
    label: "Sul",
  },
  {
    key: "LESTE",
    label: "Leste",
  },
  {
    key: "OESTE",
    label: "Oeste",
  },
];

export default function PhotoUploader({
  photos,
  setPhotos,
  uploadedPhotos,
  removeUploadedPhoto,
}) {
  const refs = {
    NORTE: useRef(),
    SUL: useRef(),
    LESTE: useRef(),
    OESTE: useRef(),
  };

  function handleFile(direction, file) {
    if (!file) return;

    setPhotos((prev) => ({
      ...prev,
      [direction]: [...(prev[direction] || []), file],
    }));
  }

  return (
    <Container>
      <h3>Fotos da Área</h3>

      <div className="grid">
        {DIRECTIONS.map((dir) => (
          <UploadCard key={dir.key}>
            <h4>{dir.label}</h4>

            <input
              ref={refs[dir.key]}
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              multiple
              onChange={(e) => handleFile(dir.key, e.target.files?.[0])}
            />

            <div className="actions">
              <button
                type="button"
                onClick={() => refs[dir.key].current.click()}
              >
                <Camera size={18} />
                Tirar Foto
              </button>

              <button
                type="button"
                onClick={() => refs[dir.key].current.click()}
              >
                <Upload size={18} />
                Arquivo
              </button>
            </div>

            <PreviewGrid>
              {(photos[dir.key] || []).map((file, index) => (
                <PreviewCard key={index}>
                  <img src={URL.createObjectURL(file)} />

                  <button
                    type="button"
                    onClick={() =>
                      setPhotos((prev) => ({
                        ...prev,
                        [dir.key]: prev[dir.key].filter((_, i) => i !== index),
                      }))
                    }
                  >
                    <Trash2 size={14} />
                  </button>
                </PreviewCard>
              ))}

              {(uploadedPhotos || [])
                .filter((p) => p.direction === dir.key)
                .map((photo) => (
                  <PreviewCard key={photo.id}>
                    <img src={photo.photo} />

                    <button
                      type="button"
                      onClick={() => removeUploadedPhoto(photo.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </PreviewCard>
                ))}
            </PreviewGrid>
          </UploadCard>
        ))}
      </div>
    </Container>
  );
}

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function SamplesMap({ samples }) {
  const defaultCenter = [-25.4284, -49.2733]; // Curitiba fallback

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      style={{ width: "100%", height: "500px", borderRadius: 12 }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {samples.map((s) => {
        if (!s.latitude || !s.longitude) return null;

        return (
          <Marker
            key={s.id}
            position={[Number(s.latitude), Number(s.longitude)]}
          >
            <Popup>
              {/* <strong>Amostra #{s.id}</strong> */}
              IQMS: {s.sample_score}
              <br />
              Densidade: {s.sample_density}
              <br />
              {s.city} - {s.state}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

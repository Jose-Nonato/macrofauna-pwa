export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
    );
  });
}

export async function reverseCoordenates(lat, lon) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
  );
  const data = await res.json();
  return {
    country: data.address?.country || "",
    state: data.address?.state || "",
    city:
      data.address?.city || data.address?.town || data.address?.village || "",
  };
}

import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "../components/MapUtils"; // marker icon fix

/* This component forces Leaflet to resize + fit route */
function FitAndResize({ stops }) {
  const map = useMap();

  useEffect(() => {
    if (!stops || stops.length === 0) return;

    const bounds = stops.map(s => [s.lat, s.lng]);

    // small delay so modal finishes rendering
    setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [20, 20] });
    }, 200);
  }, [map, stops]);

  return null;
}

function SimpleMap({ stops }) {
  if (!stops || stops.length === 0) return null;

  const polylinePositions = stops.map(s => [s.lat, s.lng]);

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[stops[0].lat, stops[0].lng]}
        zoom={10}
        scrollWheelZoom={false}
        dragging={true}
        className="leaflet-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <FitAndResize stops={stops} />

        {stops.map((stop, i) => (
          <Marker key={i} position={[stop.lat, stop.lng]} />
        ))}

        <Polyline positions={polylinePositions} />
      </MapContainer>
    </div>
  );
}

export default SimpleMap;

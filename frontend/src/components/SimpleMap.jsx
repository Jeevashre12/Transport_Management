import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

function SimpleMap({ stops }) {
  useEffect(() => {
    if (!stops || stops.length < 2) return;

    const map = L.map("map").setView(
      [stops[0].lat, stops[0].lng],
      10
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap"
    }).addTo(map);

    // Markers
    stops.forEach(stop => {
      L.marker([stop.lat, stop.lng])
        .addTo(map)
        .bindPopup(stop.name);
    });

    // 🛣️ ROAD FOLLOWING ROUTE
    L.Routing.control({
      waypoints: stops.map(stop =>
        L.latLng(stop.lat, stop.lng)
      ),
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ weight: 5 }]
      }
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [stops]);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
}

export default SimpleMap;

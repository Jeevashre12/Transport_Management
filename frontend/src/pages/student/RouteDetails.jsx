import { useState } from "react";
import routeBg from "../../assets/route_bg.jpeg";
import "./RouteDetails.css";
import SimpleMap from "../../components/SimpleMap";


function RouteDetails() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = [
    {
      name: "Erode – College",
      buses: 20,
      stops: [
        { name: "Erode", lat: 11.3410, lng: 77.7172 },
        { name: "Perundurai", lat: 11.3148, lng: 77.5660 },
        { name: "Kangeyam", lat: 11.0457, lng: 77.5360 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "Bus Number 10", driver: "Ramesh", incharge: "Suresh" },
        { busNo: "Bus Number 20", driver: "Kumar", incharge: "Mahesh" }
      ]
    },
    {
      name: "Sathyamangalam – College",
      buses: 2,
      stops: [
        { name: "Sathyamangalam", lat: 11.5295, lng: 77.0058 },
        { name: "Gobichettipalayam", lat: 11.4333, lng: 77.4333 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "TN36 CD 1122", driver: "Senthil", incharge: "Ravi" }
      ]
    },
    {
      name: "Gobi – College",
      buses: 6,
      stops: [
        { name: "Gobi", lat: 11.4260, lng: 77.0847 },
        { name: "Nambiyur", lat: 11.2500, lng: 77.4800 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "TN38 EF 3344", driver: "Arun", incharge: "Vijay" },
        { busNo: "TN38 EF 5566", driver: "Karthik", incharge: "Prakash" }
      ]
    }
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <div
        className="hero"
        style={{ backgroundImage: `url(${routeBg})` }}
      >
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">Transport Routes</h1>
            <p className="hero-subtitle">
              Check all available routes to your college here
            </p>
          </div>
        </div>
      </div>

      {/* ROUTE TABLE */}
      <div className="route-container">
        <table className="route-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>No. of Buses</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route, index) => (
              <tr key={index}>
                <td>{route.name}</td>
                <td>{route.buses}</td>
                <td>
                  <button onClick={() => setSelectedRoute(route)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      {selectedRoute && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedRoute.name}</h3>

            {/* MINI MAP */}
            <div style={{ width: "100%", height: "200px", marginBottom: "15px" }}>
              <SimpleMap stops={selectedRoute.stops} />
            </div>

            {/* STOPS SECTION */}
            <div className="modal-section">
              <h4>Stoppings</h4>
              <ul className="stops-list">
                {selectedRoute.stops.map((stop, i) => (
                  <li key={i}>{stop.name}</li>
                ))}
              </ul>
            </div>

            {/* BUS DETAILS SECTION */}
            <div className="modal-section">
              <h4>Bus Details</h4>
              <table className="modal-table">
                <thead>
                  <tr>
                    <th>Bus No</th>
                    <th>Driver</th>
                    <th>Incharge</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRoute.busDetails.map((bus, i) => (
                    <tr key={i}>
                      <td>{bus.busNo}</td>
                      <td className="driver">{bus.driver}</td>
                      <td className="incharge">{bus.incharge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={() => setSelectedRoute(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RouteDetails;

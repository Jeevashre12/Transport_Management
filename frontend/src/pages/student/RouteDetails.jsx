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
    },

    {
      name: "Athani – College",
      buses: 2,
      stops: [
        { name: "Athani", lat: 11.0822, lng: 77.3587 },
        { name: "Perundurai", lat: 11.3148, lng: 77.5660 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "TN33 AT 2211", driver: "Ravi", incharge: "Suresh" }
      ]
    },

    {
      name: "Anthiyur – College",
      buses: 2,
      stops: [
        { name: "Anthiyur", lat: 11.5756, lng: 77.5901 },
        { name: "Bhavani", lat: 11.4456, lng: 77.6826 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "TN36 AN 3344", driver: "Mani", incharge: "Karthik" }
      ]
    },

    {
      name: "Komarapalayam – College",
      buses: 2,
      stops: [
        { name: "Komarapalayam", lat: 11.4460, lng: 77.6937 },
        { name: "Bhavani", lat: 11.4456, lng: 77.6826 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "TN28 KP 5566", driver: "Suresh", incharge: "Ramesh" }
      ]
    },

    {
      name: "Bhavani – College",
      buses: 2,
      stops: [
        { name: "Bhavani", lat: 11.4456, lng: 77.6826 },
        { name: "Perundurai", lat: 11.3148, lng: 77.5660 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "TN36 BH 7788", driver: "Arun", incharge: "Vijay" }
      ]
    },

    {
      name: "Tiruppur – College",
      buses: 13,
      stops: [
        { name: "Tiruppur", lat: 11.1085, lng: 77.3411 },
        { name: "Kangeyam", lat: 11.0457, lng: 77.5360 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "TN39 TP 8899", driver: "Kumar", incharge: "Ravi" }
      ]
    },

    {
      name: "Avinashi – College",
      buses: 1,
      stops: [
        { name: "Avinashi", lat: 11.1923, lng: 77.2680 },
        { name: "Tiruppur", lat: 11.1085, lng: 77.3411 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "TN39 AV 1122", driver: "Senthil", incharge: "Prakash" }
      ]
    },

    {
      name: "Chennimalai – College",
      buses: 2,
      stops: [
        { name: "Chennimalai", lat: 11.1606, lng: 77.6031 },
        { name: "Perundurai", lat: 11.3148, lng: 77.5660 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "TN33 CM 4455", driver: "Manoj", incharge: "Suresh" }
      ]
    },

    {
      name: "Perundurai Bus Stand – College",
      buses: 7,
      stops: [
        { name: "Perundurai Bus Stand", lat: 11.2743, lng: 77.5832 },
        { name: "Perundurai", lat: 11.3148, lng: 77.5660 },
        { name: "College", lat: 11.0123, lng: 77.5555 }
      ],
      busDetails: [
        { busNo: "TN33 PD 6677", driver: "Prakash", incharge: "Senthil" }
      ]
    }
  ];

  return (
    <div>
      {/* HERO */}
      <div className="hero" style={{ backgroundImage: `url(${routeBg})` }}>
        <div className="hero-inner">
          <h1 className="hero-title">Transport Routes</h1>
          <p className="hero-subtitle">
            Check all available routes to your college here
          </p>
        </div>
      </div>

      {/* TABLE */}
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

      {/* MODAL */}
      {selectedRoute && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedRoute.name}</h3>

            <div style={{ height: "200px", marginBottom: "15px" }}>
              <SimpleMap stops={selectedRoute.stops} />
            </div>

            <h4>Stoppings</h4>
            <ul>
              {selectedRoute.stops.map((s, i) => (
                <li key={i}>{s.name}</li>
              ))}
            </ul>

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
                {selectedRoute.busDetails.map((b, i) => (
                  <tr key={i}>
                    <td>{b.busNo}</td>
                    <td>{b.driver}</td>
                    <td>{b.incharge}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={() => setSelectedRoute(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RouteDetails;

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentDashboard from "./pages/student/StudentDashboard";
import RouteDetails from "./pages/student/RouteDetails";
import RequestRoute from "./pages/student/RequestRoute";
import ReportIssue from "./pages/student/ReportIssue";
import Notifications from "./pages/student/Notifications";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Student Module */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/route" element={<RouteDetails />} />
        <Route path="/student/request-route" element={<RequestRoute />} />
        <Route path="/student/report-issue" element={<ReportIssue />} />
        <Route path="/student/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

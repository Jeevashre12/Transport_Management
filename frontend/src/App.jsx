import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentDashboard from "./pages/student/StudentDashboard";
import RouteDetails from "./pages/student/RouteDetails";
import RequestRoute from "./pages/student/RequestRoute";
import ReportIssue from "./pages/student/ReportIssue";
import Notifications from "./pages/student/Notifications";
import Support from "./pages/transportOffice/Support";

import Requests from "./pages/dept_coordinator/Requests";
import IssueReports from "./pages/dept_coordinator/IssueReports";
import CoordNotifications from "./pages/dept_coordinator/CoordNotifications";
import DeptCoordinatorDashboard from './pages/dept_coordinator/DeptCoordinatorDashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/support" element={<Support />} />

        {/* Student Module */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/route" element={<RouteDetails />} />
        <Route path="/student/request-route" element={<RequestRoute />} />
        <Route path="/student/report-issue" element={<ReportIssue />} />
        <Route path="/student/notifications" element={<Notifications />} />

       {/* Coordinator Module */}
<Route path="/dept_coordinator/dashboard" element={<DeptCoordinatorDashboard />} />
<Route path="/dept_coordinator/requests" element={<Requests />} />
<Route path="/dept_coordinator/coordnotifications" element={<CoordNotifications />} />
<Route path="/dept_coordinator/issues" element={<IssueReports />} />


      </Routes>

      
        
    </BrowserRouter>
  );
}

export default App;

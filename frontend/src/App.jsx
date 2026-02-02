import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Student module
import StudentDashboard from "./pages/student/StudentDashboard";
import RouteDetails from "./pages/student/RouteDetails";
import RequestRoute from "./pages/student/RequestRoute";
import ReportIssue from "./pages/student/ReportIssue";
import Notifications from "./pages/student/Notifications";

// Transport office
import TransportDashboard from "./pages/transportOffice/TransportDashboard";
import ApprovalSystem from "./pages/transportOffice/ApprovalSystem";
import Support from "./pages/Support";
import DeptCoordinatorDashboard from "./pages/dept_coordinator/DeptCoordinatorDashboard";
import DeptRequests from "./pages/dept_coordinator/DeptRequests";
import DeptIssueReports from "./pages/dept_coordinator/DeptIssueReports";
import DeptNotifications from "./pages/dept_coordinator/DeptNotifications";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/support" element={<Support />} />

        {/* Student */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/route" element={<RouteDetails />} />
        <Route path="/student/request-route" element={<RequestRoute />} />
        <Route path="/student/report-issue" element={<ReportIssue />} />
        <Route path="/student/notifications" element={<Notifications />} />

  {/* Transport office Module */}
  <Route path="/admin/dashboard" element={<TransportDashboard />}/>
  <Route path="/admin/approvals" element={<ApprovalSystem />}/>

  {/* Department Coordinator Module */}
  <Route path="/dept/dashboard" element={<DeptCoordinatorDashboard />}/>
  <Route path="/dept/requests" element={<DeptRequests />}/>
  <Route path="/dept/issues" element={<DeptIssueReports />}/>
  <Route path="/dept/notifications" element={<DeptNotifications />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

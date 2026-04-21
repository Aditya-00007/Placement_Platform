import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import ApplyJobModal from "./components/modals/ApplyJobModal";
import Signin from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import ApplicationsPage from "./pages/ApplicationsPage";
import EmployerProfile from "./pages/EmployerProfile";
import JobsPage from "./pages/JobsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Unauthorized from "./pages/Unauthorized";
import AdminJobs from "./pages/AdminJobs";
import AdminCandidatesPage from "./pages/AdminCandidatesPage";
import AdminEmployersPage from "./pages/AdminEmployersPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/jobs"
        element={
          <AdminRoute>
            <AdminJobs />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/candidates"
        element={
          <AdminRoute>
            <AdminCandidatesPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/employers"
        element={
          <AdminRoute>
            <AdminEmployersPage />
          </AdminRoute>
        }
      />
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["employer"]}>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/profile"
        element={
          <ProtectedRoute allowedRoles={["employer"]}>
            <EmployerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/jobs"
        element={
          <ProtectedRoute allowedRoles={["employer"]}>
            <JobsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/applications"
        element={
          <ProtectedRoute allowedRoles={["employer"]}>
            <ApplicationsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

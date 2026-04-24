import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";

// Public Pages
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicePage";
import CertificationPage from "./pages/CertificationPage";
import RegistrationPage from "./pages/RegistrationPage";
import CurrentJobsPage from "./pages/CurrentJobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import ContactPage from "./pages/ContactPage";

// Auth
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

// Dashboards
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerProfile from "./pages/EmployerProfile";
import JobsPage from "./pages/JobsPage";
import ApplicationsPage from "./pages/ApplicationsPage";

// Admin
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminJobs from "./pages/AdminJobs";
import AdminCandidatesPage from "./pages/AdminCandidatesPage";
import AdminEmployersPage from "./pages/AdminEmployersPage";

// Routes Protection
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/certification" element={<CertificationPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/current-jobs" element={<CurrentJobsPage />} />
        <Route path="/current-jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Auth */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/*  CANDIDATE routes */}
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      {/*  EMPLOYER routes */}
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

      {/*  ADMIN routs */}
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
    </Routes>
  );
}

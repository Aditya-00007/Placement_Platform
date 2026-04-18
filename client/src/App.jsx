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

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/profile"
        element={
          <ProtectedRoute>
            <EmployerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/jobs"
        element={
          <ProtectedRoute>
            <JobsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/applications"
        element={
          <ProtectedRoute>
            <ApplicationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ApplyJobModal
            isOpen={true}
            onClose={() => console.log("Closed")}
            onSubmit={(payload) => console.log(payload)}
            job={{ id: 1, title: "Test Job", location: "Anywhere" }}
          />
        }
      />
    </Routes>
  );
}

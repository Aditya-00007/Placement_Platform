import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import ApplyJobModal from "./components/modals/ApplyJobModal";
import Signin from "./pages/Signin";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/signin" element={<Signin />} />
      <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      <Route path="/employer/dashboard" element={<EmployerDashboard />} />

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

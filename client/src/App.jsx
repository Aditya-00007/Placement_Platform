import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import ApplyJobModal from "./components/modals/ApplyJobModal";

export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Signup />} /> */}
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

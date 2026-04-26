import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role) {
    if (role === "employer") {
      return <Navigate to="/employer/dashboard" />;
    } else if (role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/candidate/dashboard" />;
    }
  }

  return children;
};

export default GuestRoute;

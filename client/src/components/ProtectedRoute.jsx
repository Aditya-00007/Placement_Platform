import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/signin" />;
  }

  // Role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;

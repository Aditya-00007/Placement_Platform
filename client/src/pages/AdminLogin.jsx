import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // save token + role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        navigate("/admin/dashboard");
      } else {
        setError(data.msg || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-2">Admin Login</h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Authorized Admins Only
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [form, setForm] = useState({
  email: "",
  password: ""
});

const navigate = useNavigate();

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful ✅");

      // SAVE TOKEN
      localStorage.setItem("token", data.token);
      // 🔥 SAVE ROLE (👉 HERE)
      localStorage.setItem("role", data.user.role);
      // ROLE BASED REDIRECT
      if (data.user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/candidate/dashboard");
      }

    } else {
      alert(data.msg);
    }

  } catch (err) {
    alert("Login error");
  }
};
 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign In
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none"
          />

          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none"
          />

         

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Sign In
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 cursor-pointer">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signin;
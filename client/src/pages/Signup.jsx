import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
  email: "",
  password: "",
  confirmPassword: "",
  role: "candidate",
  otp: ""
  });

  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: form.email })
    });

  const data = await res.json();

    if (res.ok) {
      alert("OTP sent ✅");
    } else {
      alert(data.msg);
    }
    } catch (err) {
      alert("Error sending OTP");
    }
    };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

  const navigate = useNavigate();

  try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: form.role,
          otp: form.otp,
          name: "User"
        })
      });

  const data = await res.json();

    if (res.ok) {
    alert("Signup successful ✅");

    // ROLE BASED REDIRECT
    if (form.role === "employer") {
      navigate("/employer/dashboard");
    } else {
      navigate("/candidate/dashboard");
    }
  } else {
      alert(data.msg);
    }
    } catch (err) {
      alert("Signup error");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignup}>

          {/* Email */}
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none"
          />

          {/* Role Selection */}
          <select name="role" onChange={handleChange}className="text-gray-700 w-full p-3 border rounded-lg focus:outline-none">
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>

          {/* OTP Row */}
          <div className="flex gap-3">

            {/* Send OTP Button */}
            <button
              type="button"
              onClick={handleSendOTP}
              className="w-1/3 bg-gray-500 text-white p-3 rounded-lg hover:bg-yellow-600"
            >
              Send OTP
            </button>

            {/* OTP Field */}
            <input
              type="text"
              name="otp" onChange={handleChange}
              placeholder="Enter OTP"
              className="w-full p-3 border rounded-lg focus:outline-none"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
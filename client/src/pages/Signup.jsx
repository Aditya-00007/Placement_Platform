import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate(); // ✅ FIXED (top level)

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
    otp: "",
  });

  const [otpTimer, setOtpTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ⏱ OTP TIMER
  const startOtpTimer = () => {
    setOtpTimer(120); // 2 minutes

    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 📩 SEND OTP
  const handleSendOTP = async () => {
    if (!form.email) return alert("Enter email first");

    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP sent ✅");
        startOtpTimer(); // 🔥 start timer
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert("Error sending OTP");
    }
  };

  // 📝 SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: form.role,
          otp: form.otp,
          name: "User",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful ✅");

        //  ROLE BASED REDIRECT
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <div className="backdrop-blur-lg bg-white/80 border border-gray-200 p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Start your journey with us 🚀
        </p>

        <form className="space-y-4" onSubmit={handleSignup}>
          {/* EMAIL */}
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* ROLE */}
          <select
            name="role"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="candidate">🎓 Candidate</option>
            <option value="employer">🏢 Employer</option>
          </select>

          {/* OTP SECTION */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={otpTimer > 0}
              className={`w-1/3 text-white p-3 rounded-lg font-medium transition-all duration-200
            ${
              otpTimer > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg"
            }`}
            >
              {otpTimer > 0
                ? `${Math.floor(otpTimer / 60)}:${String(
                    otpTimer % 60,
                  ).padStart(2, "0")}`
                : "Send OTP"}
            </button>

            <input
              type="text"
              name="otp"
              onChange={handleChange}
              placeholder="Enter OTP"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={
              loading ||
              !form.otp ||
              form.otp.length < 6 ||
              form.password !== form.confirmPassword
            }
            className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-200
        ${
          loading ||
          !form.otp ||
          form.otp.length < 6 ||
          form.password !== form.confirmPassword
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md hover:shadow-lg"
        }`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

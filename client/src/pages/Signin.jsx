import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResetPasswordModal from "../components/modals/ResetPasswordModal";
import toast from "react-hot-toast";
import {
  EnvelopeSimple,
  LockKey,
  ArrowRight,
  GraduationCap,
  Buildings,
  Briefcase,
} from "@phosphor-icons/react";

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fillDemo = (email, password) => {
    setForm({ email, password });
    toast.success(`Loaded credentials for ${email}`, { duration: 2000 });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome back! Redirecting to dashboard...");
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role.toLowerCase().trim());
        
        if (data.user.role === "employer") {
          navigate("/employer/dashboard");
        } else {
          navigate("/candidate/dashboard");
        }
      } else {
        toast.error(data.msg || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Server connection error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Briefcase size={22} weight="bold" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 font-heading">
            Placement<span className="text-blue-600">Platform</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
          Sign In to Your Account
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Access your candidate evaluations or employer recruitment pipeline
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/40">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Work / Academic Email
              </label>
              <div className="relative">
                <EnvelopeSimple
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="name@placement.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <LockKey
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white text-xs sm:text-sm font-semibold py-2.5 rounded-lg shadow-sm transition"
            >
              {submitting ? "Authenticating..." : "Sign In to Dashboard"}
              {!submitting && <ArrowRight size={15} weight="bold" />}
            </button>
          </form>

          {/* Quick Demo Logins Helper */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">
              One-Click Seed Accounts
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemo("student@placement.com", "password123")}
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-700 hover:text-blue-700 text-xs font-medium transition"
              >
                <GraduationCap size={16} weight="bold" />
                <span>Student Demo</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemo("teacher@placement.com", "password123")}
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-700 hover:text-blue-700 text-xs font-medium transition"
              >
                <Buildings size={16} weight="bold" />
                <span>Recruiter Demo</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>

      <ResetPasswordModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Signin;

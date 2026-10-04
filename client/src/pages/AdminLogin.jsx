import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, LockKey, EnvelopeSimple, ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fillAdminDemo = () => {
    setForm({
      email: "admin@placement.com",
      password: "admin123",
    });
    toast.success("Loaded admin credentials");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
        toast.success("Administrative access granted");
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        navigate("/admin/dashboard");
      } else {
        toast.error(data.msg || "Invalid administrative credentials");
      }
    } catch (err) {
      toast.error("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-slate-950 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle radial glow in background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_55%)] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-4 shadow-lg shadow-blue-500/10">
          <ShieldCheck size={28} weight="duotone" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white font-heading">
          Administrative Control Console
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Restricted access for system administrators & governance officers
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 relative z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <EnvelopeSimple
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@placement.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-950/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Master Password
              </label>
              <div className="relative">
                <LockKey
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-950/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white text-xs sm:text-sm font-semibold py-2.5 rounded-lg shadow-sm transition"
            >
              {loading ? "Authenticating..." : "Authenticate Session"}
              {!loading && <ArrowRight size={15} weight="bold" />}
            </button>
          </form>

          {/* Quick Demo Fill */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={fillAdminDemo}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 bg-slate-950/60 px-3 py-1.5 rounded-md border border-slate-800 hover:border-blue-500/30 transition"
            >
              <ShieldCheck size={14} weight="bold" />
              <span>Fill Seeded Admin Credentials</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition"
            >
              <ArrowLeft size={13} /> Return to Public Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

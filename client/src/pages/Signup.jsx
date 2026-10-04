import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  User,
  EnvelopeSimple,
  LockKey,
  GraduationCap,
  Buildings,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Briefcase,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryRole = searchParams.get("role");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: queryRole === "employer" ? "employer" : "candidate",
    otp: "",
  });

  useEffect(() => {
    if (queryRole === "employer" || queryRole === "candidate") {
      setForm((prev) => ({ ...prev, role: queryRole }));
    }
  }, [queryRole]);

  const [otpTimer, setOtpTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startOtpTimer = () => {
    setOtpTimer(120);
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

  const handleSendOTP = async () => {
    if (!form.email) {
      toast.error("Please provide an email address first");
      return;
    }

    setSendingOtp(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.dev_otp) {
          setForm((prev) => ({ ...prev, otp: data.dev_otp }));
          toast.success(`Verification Code: ${data.dev_otp} (Auto-filled)`, { duration: 5000 });
        } else {
          toast.success("Verification code sent to your email");
        }
        startOtpTimer();
      } else {
        toast.error(data.msg || "Could not send verification code");
      }
    } catch (err) {
      toast.error("Connection error sending code");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!form.otp || form.otp.length < 6) {
      toast.error("Please enter the 6-digit verification code");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: form.role,
          otp: form.otp.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully!");
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", form.role);
        }
        if (form.role === "employer") {
          navigate("/employer/dashboard");
        } else {
          navigate("/candidate/dashboard");
        }
      } else {
        toast.error(data.msg || "Registration failed");
      }
    } catch (err) {
      toast.error("Server communication error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Briefcase size={22} weight="bold" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 font-heading">
            Placement<span className="text-blue-600">Platform</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
          Create Your Account
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Join thousands of candidates and corporate recruiters
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/40">
          {/* Role Selector Segmented Control */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Account Type
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100/80 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, role: "candidate" }))}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition ${
                  form.role === "candidate"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <GraduationCap size={16} weight={form.role === "candidate" ? "bold" : "regular"} />
                Candidate / Student
              </button>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, role: "employer" }))}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition ${
                  form.role === "employer"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Buildings size={16} weight={form.role === "employer" ? "bold" : "regular"} />
                Corporate Recruiter
              </button>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={form.role === "candidate" ? "e.g. John Doe" : "e.g. Dr. Rajesh Sharma"}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
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
                  placeholder={form.role === "candidate" ? "student@placement.com" : "recruiter@company.com"}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
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
                    placeholder="Min. 6 chars"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockKey
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition"
                  />
                </div>
              </div>
            </div>

            {/* OTP Verification Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Verification Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  placeholder="6-digit code"
                  maxLength={6}
                  className="flex-1 px-3.5 py-2 text-sm font-mono tracking-widest bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition text-center"
                />
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={otpTimer > 0 || sendingOtp}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                    otpTimer > 0
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {sendingOtp
                    ? "Sending..."
                    : otpTimer > 0
                    ? `${Math.floor(otpTimer / 60)}:${String(otpTimer % 60).padStart(2, "0")}`
                    : "Get Code"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white text-xs sm:text-sm font-semibold py-2.5 rounded-lg shadow-sm transition"
            >
              {loading ? "Creating Account..." : "Complete Registration"}
              {!loading && <ArrowRight size={15} weight="bold" />}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

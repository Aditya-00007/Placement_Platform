import { useState } from "react";
import toast from "react-hot-toast";
import { LockKey, EnvelopeSimple, X, ArrowRight, CheckCircle } from "@phosphor-icons/react";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!form.email) {
      toast.error("Please enter your registered email");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/forgot-password/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.dev_otp) {
          setForm((prev) => ({ ...prev, otp: data.dev_otp }));
          toast.success(`Verification Code: ${data.dev_otp} (Auto-filled)`, { duration: 5000 });
        } else {
          toast.success("Password recovery code sent to your email");
        }
        setStep(2);
      } else {
        toast.error(data.msg || "Could not generate recovery code");
      }
    } catch (err) {
      toast.error("Error communicating with recovery service");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!form.otp || form.otp.length < 6) {
      toast.error("Please enter the 6-digit recovery code");
      return;
    }
    if (!form.newPassword || form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successfully! You can now sign in.");
        onClose();
        setStep(1);
        setForm({ email: "", otp: "", newPassword: "" });
      } else {
        toast.error(data.msg || "Password reset failed");
      }
    } catch (err) {
      toast.error("Server error resetting password");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-7 w-full max-w-sm shadow-2xl border border-slate-200/90 relative animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
          aria-label="Close"
        >
          <X size={18} weight="bold" />
        </button>

        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <LockKey size={22} weight="duotone" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">
          {step === 1 ? "Reset Password" : "Enter Verification Code"}
        </h3>

        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          {step === 1
            ? "Enter the email associated with your candidate or employer account."
            : `Enter the 6-digit code sent to ${form.email} and choose a new password.`}
        </p>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Account Email
              </label>
              <div className="relative">
                <EnvelopeSimple
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="name@placement.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white text-xs sm:text-sm font-semibold py-2.5 rounded-lg shadow-sm transition"
            >
              {submitting ? "Sending Code..." : "Send Verification Code"}
              {!submitting && <ArrowRight size={15} weight="bold" />}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Verification Code
              </label>
              <input
                type="text"
                name="otp"
                placeholder="6-digit code"
                value={form.otp}
                onChange={handleChange}
                maxLength={6}
                required
                className="w-full px-3.5 py-2.5 text-sm font-mono tracking-widest text-center bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <div className="relative">
                <LockKey
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Min. 6 characters"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white text-xs sm:text-sm font-semibold py-2.5 rounded-lg shadow-sm transition"
            >
              {submitting ? "Updating..." : "Update Password"}
              {!submitting && <CheckCircle size={15} weight="bold" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordModal;

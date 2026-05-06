import { useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // STEP 1 → SEND OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

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
        toast.success("OTP sent 📩");
        setStep(2);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error("Error sending OTP");
    }
  };

  // STEP 2 → RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();

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
        toast.success("Password reset successful ✅");
        onClose();
        setStep(1);
        setForm({ email: "", otp: "", newPassword: "" });
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error("Error resetting password");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute  top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">
          Reset Password 🔐
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          {step === 1
            ? "Enter your email to receive OTP"
            : "Enter OTP and new password"}
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 cursor-pointer to-indigo-600 text-white p-3 rounded-lg font-semibold"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full cursor-pointer bg-green-500 text-white p-3 rounded-lg font-semibold"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordModal;

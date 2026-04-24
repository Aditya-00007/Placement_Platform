import { useEffect, useState } from "react";

export default function Header({ toggleSidebar, user, status }) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) setGreeting("Good Morning ☀️");
    else if (hour < 18) setGreeting("Good Afternoon 🌤️");
    else setGreeting("Good Evening 🌙 ");
  }, []);

  // 🎯 Status Badge UI
  const renderStatusBadge = () => {
    if (user?.role !== "employer") return null;

    const styles = {
      approved: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      suspended: "bg-red-100 text-red-700",
    };

    const labels = {
      approved: "✔ Verified",
      pending: "⏳ Pending",
      suspended: "⚠ Suspended",
    };

    return (
      <span className={`text-xs px-3 py-1 rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <nav className="h-16 bg-white shadow-md px-6 flex justify-between items-center border-b">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="px-3 py-2 border rounded-md hover:bg-gray-100 transition"
        >
          ☰
        </button>

        <div className="flex items-center gap-3">
          <img
            src="/Images/download.webp"
            alt="Company Logo"
            className="w-15 h-15 object-contain"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-gray-800">
              Placement Cell
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {user?.role === "admin" && "Admin Dashboard"}
                {user?.role === "employer" && "Employer Panel"}
                {user?.role === "candidate" && "Candidate Dashboard"}
              </span>

              {/* ✅ Status Badge here */}
              {renderStatusBadge()}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm text-gray-500">{greeting}</p>
          <p className="font-semibold text-gray-800">{user?.name || "User"}</p>
        </div>

        {/* Role Badge */}
        <span className="hidden sm:inline-block text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full capitalize">
          {user?.role}
        </span>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
      </div>
    </nav>
  );
}

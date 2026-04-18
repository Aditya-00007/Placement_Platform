import { useState } from "react";

function Dashboard() {
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔝 Topbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow">
        
        {/* ☰ Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl font-bold"
        >
          ☰
        </button>

        <h1 className="text-xl font-semibold">Placement Portal</h1>

        <p className="bg-gray-200 rounded-lg px-4 py-2">
          {role === "employer" ? "Employer" : "Candidate"}
        </p>
      </div>

      {/* 🔻 Layout */}
      <div className="flex">

        {/* 🔥 Sidebar */}
        <div
          className={`bg-gray-900 text-white min-h-screen transition-all duration-300
          ${isOpen ? "w-64 p-4" : "w-0 overflow-hidden"}`}
        >
          <nav className="space-y-3 mt-4">
            <div className="bg-gray-700 p-3 rounded-lg">Dashboard</div>
            <div className="hover:bg-gray-700 p-3 rounded-lg cursor-pointer">Profile</div>
            <div className="hover:bg-gray-700 p-3 rounded-lg cursor-pointer">View Jobs</div>
            <div className="hover:bg-gray-700 p-3 rounded-lg cursor-pointer">Apply</div>
            <div className="hover:bg-gray-700 p-3 rounded-lg cursor-pointer">Application Status</div>
          </nav>

          <div className="mt-auto text-red-400 cursor-pointer">Logout</div>
        </div>

        {/* 📄 Main Content */}
        <div
          className={`flex-1 p-6 transition-all duration-300`}
        >
          <h2 className="text-lg font-semibold">Dashboard Content</h2>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null); //

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  //  Get user
  useEffect(() => {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    setUser({ role, name });
  }, []);

  //  Fetch status
  useEffect(() => {
    if (user?.role !== "employer") return;

    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/api/employer/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStatus(res.data.isApproved ? "approved" : "pending");
      } catch (err) {
        console.error("Error fetching status:", err);
      }
    };

    fetchStatus();
  }, [user]);

  return (
    <div className="h-screen overflow-hidden">
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header toggleSidebar={toggleSidebar} user={user} status={status} />
      </div>

      {/* BODY */}
      <div className="flex pt-15 h-full">
        {/* SIDEBAR */}
        <div
          className={`fixed top-15 left-0 h-full bg-[#212529] transition-all duration-300
          ${collapsed ? "w-17.5" : "w-65"}`}
        >
          <Sidebar collapsed={collapsed} />
        </div>

        {/* MAIN */}
        <main
          className={`flex-1 bg-gray-100 p-6 overflow-y-auto transition-all duration-300
          ${collapsed ? "ml-17.5" : "ml-65"}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

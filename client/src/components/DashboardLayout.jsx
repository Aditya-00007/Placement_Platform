import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState("");

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const role = localStorage.getItem("role");

    setUser(role);
  }, []);
  return (
    <div className="h-screen overflow-hidden">
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header
          toggleSidebar={toggleSidebar}
          user={{ name: "User", role: user }}
        />
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

        {/* MAIN CONTENT */}
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

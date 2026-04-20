import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import Header from "../components/Header";

export default function AdminDashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen overflow-hidden">
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header toggleSidebar={() => setCollapsed(!collapsed)} />
      </div>

      {/* BODY */}
      <div className="flex pt-15 h-full">
        {/* SIDEBAR */}
        <div
          className={`fixed top-15 left-0 h-full bg-[#212529] transition-all duration-300
          ${collapsed ? "w-17.5" : "w-65"}`}
        >
          <AdminSidebar collapsed={collapsed} />
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

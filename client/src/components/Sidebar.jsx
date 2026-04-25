import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ collapsed }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/employer/dashboard", icon: "🏠" },
    { name: "Jobs", path: "/employer/jobs", icon: "💼" },
    { name: "Applications", path: "/employer/applications", icon: "📄" },
    { name: "Tests", path: "/employer/tests", icon: "🧾" },
    { name: "Profile", path: "/employer/profile", icon: "👤" },
  ];

  return (
    <aside className="h-full p-2">
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path);

          return (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition
                  ${
                    isActive
                      ? "bg-[#343a40] text-white"
                      : "text-[#adb5bd] hover:bg-[#343a40] hover:text-white"
                  }`}
              >
                <span>{item.icon}</span>

                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}

        {/* Logout */}
        <li className="pt-2 border-t border-white/20">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/20"
          >
            <span>🚪</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </aside>
  );
}

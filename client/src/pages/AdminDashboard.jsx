import { useEffect, useState } from "react";
import AdminDashboardLayout from "../components/AdminDashboardLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    candidates: 0,
    employers: 0,
    jobs: 0,
    applications: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/admin/dashboard", {
          headers: {
            Authorization: token,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          console.error(data.msg);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Candidates</h3>
            <p className="text-2xl font-bold">{stats.candidates}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Employers</h3>
            <p className="text-2xl font-bold">{stats.employers}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Jobs</h3>
            <p className="text-2xl font-bold">{stats.jobs}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Applications</h3>
            <p className="text-2xl font-bold">{stats.applications}</p>
          </div>
        </div>

        {/* RECENT SECTION */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <ul className="space-y-3 text-gray-600">
            <li>✔ New candidate registered</li>
            <li>✔ Employer posted a job</li>
            <li>✔ Application submitted</li>
          </ul>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;

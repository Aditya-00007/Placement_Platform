import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function EmployerDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
    hired: 0,
  });

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/employer/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(
        res.data?.stats || {
          totalJobs: 0,
          totalApplications: 0,
          shortlisted: 0,
          hired: 0,
        },
      );

      setJobs(res.data?.jobs || []);
      setApplications(res.data?.applications || []);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  return (
    <DashboardLayout>
      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Jobs Posted" value={stats?.totalJobs} />
        <StatCard title="Applications" value={stats?.totalApplications} />
        <StatCard title="Shortlisted" value={stats?.shortlisted} />
        <StatCard title="Hired" value={stats?.hired} />
      </div>

      {/* JOBS */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Recent Jobs</h3>

        {jobs.length === 0 ? (
          <p>No jobs posted</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="border-b py-2 flex justify-between">
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <span className="text-sm text-blue-500">{job.status}</span>
            </div>
          ))
        )}
      </div>

      {/* APPLICATIONS */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Recent Applications</h3>

        {applications.length === 0 ? (
          <p>No applications yet</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="border-b py-2 flex justify-between">
              <div>
                <p className="font-medium">{app.candidate_name}</p>
                <p className="text-sm text-gray-500">{app.job_title}</p>
              </div>
              <span className="text-sm text-green-500">{app.status}</span>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

/* STAT CARD */
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value || 0}</h2>
    </div>
  );
}

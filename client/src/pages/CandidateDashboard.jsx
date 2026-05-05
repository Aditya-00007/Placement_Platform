import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

export default function CandidateDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    availableJobs: 0,
    appliedJobs: 0,
    accepted: 0,
    rejected: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/candidate/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data?.stats || {
        availableJobs: 0,
        appliedJobs: 0,
        accepted: 0,
        rejected: 0,
      });

      setRecentJobs(res.data?.recentJobs || []);
      setRecommendedJobs(res.data?.recommendedJobs || []);
    } catch (err) {
      console.error("Dashboard error:", err);
     
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Available Jobs" value={stats.availableJobs} />
        <StatCard title="Applied Jobs" value={stats.appliedJobs} />
        <StatCard title="Accepted" value={stats.accepted} />
        <StatCard title="Rejected" value={stats.rejected} />
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Recent Jobs</h3>

        {recentJobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          recentJobs.map((job) => (
            <div key={job.id} className="border-b py-2 flex justify-between">
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <span className="text-sm text-blue-500">
                ₹{job.salary || "N/A"}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Recommended Jobs</h3>

        {recommendedJobs.length === 0 ? (
          <p>No recommendations yet</p>
        ) : (
          recommendedJobs.map((job) => (
            <div key={job.id} className="border-b py-2 flex justify-between">
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <span className="text-sm text-green-500">
                Match: {job.match_score || 0}%
              </span>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value || 0}</h2>
    </div>
  );
}
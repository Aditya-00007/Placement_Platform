import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function CandidateApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/candidate/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data.applications || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    if (status === "accepted") return "text-green-500";
    if (status === "rejected") return "text-red-500";
    return "text-yellow-500";
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Applications</h1>

        {applications.length === 0 ? (
          <p>No applications yet</p>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-4 rounded shadow mb-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{app.job_title}</h3>
                <p className="text-gray-500">{app.company_name}</p>
              </div>

              <span className={`font-semibold ${getStatusColor(app.status)}`}>
                {app.status || "pending"}
              </span>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
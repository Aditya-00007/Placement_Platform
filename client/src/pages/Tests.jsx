import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import TestConfigModal from "../components/modals/TestConfigModal";

export default function Tests() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [testStatus, setTestStatus] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/api/employer/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const jobsData = res.data.jobs || [];
        setJobs(jobsData);

        // 🔥 Fetch test status for each job
        const statusObj = {};

        for (let job of jobsData) {
          const statusRes = await axios.get(
            `/api/employer/test-status/${job.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          statusObj[job.id] = statusRes.data.hasTest;
        }

        setTestStatus(statusObj);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);
  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Tests</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Job ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="text-center border-t">
                <td className="p-2">{job.id}</td>
                <td className="p-2">{job.title}</td>
                <td className="p-2">
                  <button
                    onClick={() => setSelectedJob(job)}
                    disabled={testStatus[job.id]}
                    className={`px-3 py-1 rounded ${
                      testStatus[job.id]
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {testStatus[job.id] ? "Test Added" : "Add Test"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <TestConfigModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </DashboardLayout>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "../components/AdminDashboardLayout";
import EmployerJobViewModal from "../components/modals/EmployerJobViewModal";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/admin/jobs", {
        headers: {
          Authorization: token,
        },
      });

      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Fetch jobs error:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/admin/jobs/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchJobs();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const closeJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `/api/admin/jobs/${id}/close`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );

      fetchJobs();
    } catch (err) {
      console.error("Close job error:", err);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">All Jobs</h1>

        {/* TABLE */}
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Company</th>
                <th className="p-3">Location</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Applications</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No jobs found
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="border-t">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.company_name}</td>
                    <td className="p-3">{job.location}</td>
                    <td className="p-3">{job.job_type}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white 
                        ${
                          job.status === "OPEN" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="p-3">{job.application_count || 0}</td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setShowViewModal(true);
                        }}
                        className="px-2 cursor-pointer py-1 bg-blue-100 text-blue-600 rounded"
                      >
                        View
                      </button>

                      {job.status === "OPEN" && (
                        <button
                          onClick={() => closeJob(job.id)}
                          className="px-2 cursor-pointer py-1 bg-yellow-100 text-yellow-700 rounded"
                        >
                          Close
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (window.confirm("Delete this job permanently?")) {
                            deleteJob(job.id);
                          }
                        }}
                        className="px-2 cursor-pointer py-1 bg-red-100 text-red-600 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <EmployerJobViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        jobId={selectedJobId}
      />
    </AdminDashboardLayout>
  );
};

export default AdminJobs;

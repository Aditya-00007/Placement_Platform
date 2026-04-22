import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import CreateJobModal from "../components/modals/CreateJobModal";
import EditJobModal from "../components/modals/EditJobModal";
import EmployerJobViewModal from "../components/modals/EmployerJobViewModal";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("recent");
  const [showModal, setShowModal] = useState(false);
  const [editJobData, setEditJobData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [filter, sort]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/api/employer/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsApproved(res.data.isApproved);
      } catch (err) {
        console.error("Status error:", err.response?.data || err.message);
      }
    };

    fetchStatus();
  }, []);

  const handleOpenModal = () => {
    if (!isApproved) {
      toast.error("Your account is not approved yet");
      return;
    }

    setShowModal(true);
  };

  const handleCreateJob = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("/api/employer/jobs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Job created:", res.data);

      //  refresh jobs list
      fetchJobs();
    } catch (err) {
      console.error("Create job error:", err);
    }
  };

  const fetchJobForEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`/api/employer/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEditJobData(res.data.job);
      setShowEditModal(true);
    } catch (err) {
      console.error("Edit fetch error:", err);
    }
  };

  const handleUpdateJob = async (data) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(`/api/employer/jobs/${editJobData.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowEditModal(false);
      fetchJobs(); // refresh list
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `/api/employer/jobs?filter=${filter}&sort=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error(err);
      setJobs([]);
    }
  };

  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/employer/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchJobs(); // refresh list
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Jobs</h1>
        <div className="flex justify-between mb-3">
          <button
            onClick={handleOpenModal}
            disabled={!isApproved}
            className={`px-4 py-2 rounded-md text-l font-medium transition-all duration-200
    ${
      isApproved
        ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-sm "
        : "bg-gray-200 text-gray-500 cursor-not-allowed"
    }
  `}
          >
            Post Job
          </button>
          {/* FILTERS */}
          <div className="flex gap-4 mb-4">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="border p-2 rounded-sm"
            >
              <option value="ALL">All</option>
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </select>

            <select
              onChange={(e) => setSort(e.target.value)}
              className="border p-2 rounded-sm"
            >
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Location</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Applications</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No jobs found
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="border-t">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.location}</td>
                    <td className="p-3">{job.job_type}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white 
                      ${job.status === "OPEN" ? "bg-green-500" : "bg-red-500"}`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="p-3">{job.application_count}</td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setShowViewModal(true);
                        }}
                        className="text-blue-500 px-2 py-1 bg-blue-100 rounded cursor-pointer"
                      >
                        View
                      </button>

                      <button
                        onClick={() => fetchJobForEdit(job.id)}
                        className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "❗ Are you sure, you want to delete this job?",
                            )
                          ) {
                            deleteJob(job.id);
                          }
                        }}
                        className="text-red-500 px-2 py-1 bg-red-100 rounded cursor-pointer"
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
      <CreateJobModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateJob}
      />
      <EditJobModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        jobData={editJobData}
        onSubmit={handleUpdateJob}
      />
      <EmployerJobViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        jobId={selectedJobId}
      />
    </DashboardLayout>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import ApplyJobModal from "../components/modals/ApplyJobModal";
import CandidateJobViewModal from "../components/modals/CandidateJobViewModel"; // ✅ FIXED NAME

export default function CandidateJobs() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("OPEN");
  const [sort, setSort] = useState("recent");

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, [filter, sort]);

  // ✅ FETCH JOBS
  const fetchJobs = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:5000/api/candidate/jobs?filter=${filter}&sort=${sort}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Jobs API Response:", res.data);

    setJobs(res.data.jobs || []);
  } catch (err) {
    console.error("Fetch jobs error:", err);
    setJobs([]);
  }
};
  // ✅ APPLY JOB
  const handleApply = async (payload) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `/api/candidate/apply/${payload.job_id}`,
        {
          cover_letter: payload.cover_letter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Applied successfully!");
      setShowApplyModal(false);
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error applying");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

        {/* FILTERS */}
        <div className="flex gap-4 mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded-sm"
          >
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded-sm"
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
          </select>
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
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
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
                        className={`px-2 py-1 rounded text-white ${
                          job.status === "OPEN"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">
                      {/* VIEW */}
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setShowViewModal(true);
                        }}
                        className="bg-gray-200 px-2 py-1 rounded"
                      >
                        View
                      </button>

                      {/* APPLY */}
                      <button
                        disabled={job.status !== "OPEN"}
                        onClick={() => {
                          setSelectedJob(job);
                          setShowApplyModal(true);
                        }}
                        className={`px-3 py-1 rounded ${
                          job.status === "OPEN"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                      >
                        Apply
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* APPLY MODAL */}
      {showApplyModal && (
        <ApplyJobModal
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          onSubmit={handleApply}
          job={selectedJob}
        />
      )}

      {/* VIEW MODAL */}
      {showViewModal && (
        <CandidateJobViewModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          jobId={selectedJobId}
        />
      )}
    </DashboardLayout>
  );
}
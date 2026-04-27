import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import ApplyJobModal from "../components/modals/ApplyJobModal";

export default function CandidateJobs() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/employer/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // IMPORTANT: show only OPEN jobs
      const openJobs = res.data.jobs.filter(
        (job) => job.status === "OPEN"
      );

      setJobs(openJobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  // APPLY FUNCTION (matches backend)
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

      alert("✅ Application submitted!");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Application failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Location</th>
                <th className="p-3">Type</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No jobs available
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="border-t">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.location}</td>
                    <td className="p-3">{job.job_type}</td>

                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowModal(true);
                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded"
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

      {/* MODAL */}
      {showModal && (
        <ApplyJobModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleApply}
          job={selectedJob}
        />
      )}
    </DashboardLayout>
  );
}
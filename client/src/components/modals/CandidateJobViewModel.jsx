import { useEffect, useState } from "react";
import axios from "axios";

export default function CandidateJobViewModal({
  isOpen,
  onClose,
  jobId,
}) {
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (jobId) fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`/api/candidate/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJob(res.data.job);
    } catch (err) {
      console.error("Fetch job error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[500px]">
        <h2 className="text-xl font-bold mb-4">Job Details</h2>

        {job ? (
          <>
            <p><b>Title:</b> {job.title}</p>
            <p><b>Location:</b> {job.location}</p>
            <p><b>Type:</b> {job.job_type}</p>
            <p><b>Description:</b> {job.description}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-1 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
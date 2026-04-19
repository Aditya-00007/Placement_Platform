import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployerJobViewModal({ isOpen, onClose, jobId }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !jobId) return;

    const fetchJob = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await axios.get(`/api/employer/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJob(res.data.job);
      } catch (err) {
        console.error("View job error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [isOpen, jobId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-2xl p-6 rounded-xl relative overflow-y-auto max-h-[90vh]">
        {/* ❌ Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Job Details</h2>

        {loading ? (
          <p>Loading...</p>
        ) : !job ? (
          <p>No data found</p>
        ) : (
          <div className="space-y-3">
            <p>
              <b>Title:</b> {job.title}
            </p>
            <p>
              <b>Location:</b> {job.location}
            </p>
            <p>
              <b>Type:</b> {job.job_type}
            </p>
            <p>
              <b>Work Mode:</b> {job.work_mode}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                className={`px-2 py-1 rounded text-white 
                ${job.status === "OPEN" ? "bg-green-500" : "bg-red-500"}`}
              >
                {job.status}
              </span>
            </p>

            <p>
              <b>Salary:</b> ₹{job.salary_min} - ₹{job.salary_max}
            </p>
            <p>
              <b>Experience:</b> {job.experience_required} years
            </p>

            <p>
              <b>Deadline:</b> {job.application_deadline}
            </p>

            <div>
              <b>Skills:</b>
              <p>{job.skills_required?.join(", ")}</p>
            </div>

            <div>
              <b>Description:</b>
              <p>{job.description}</p>
            </div>

            <div>
              <b>Requirements:</b>
              <p>{job.requirements}</p>
            </div>

            <div>
              <b>Responsibilities:</b>
              <p>{job.responsibilities}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Eligibility</h3>
              <p>
                <b>Education:</b> {job.eligibility?.min_education}
              </p>
              <p>
                <b>CGPA:</b> {job.eligibility?.min_cgpa}
              </p>
              <p>
                <b>Branches:</b> {job.eligibility?.allowed_branches?.join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

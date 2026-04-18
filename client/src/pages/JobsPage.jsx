import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    fetchJobs();
  }, [filter, sort]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        `/api/employer/jobs?filter=${filter}&sort=${sort}`,
      );

      console.log("JOBS DATA:", res.data); // debug

      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error(err);
      setJobs([]);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Jobs</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => (window.location.href = "/jobs/create")}
        >
          + Add Job
        </button>

        {/* FILTERS */}
        <div className="flex gap-4 mb-4">
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2"
          >
            <option value="ALL">All</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>

          <select
            onChange={(e) => setSort(e.target.value)}
            className="border p-2"
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
                        onClick={() =>
                          (window.location.href = `/jobs/${job.id}`)
                        }
                        className="text-blue-500"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          (window.location.href = `/jobs/edit/${job.id}`)
                        }
                        className="text-yellow-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteJob(job.id)}
                        className="text-red-500"
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
    </DashboardLayout>
  );

  async function deleteJob(id) {
    if (!window.confirm("Delete this job?")) return;

    await axios.delete(`/api/employer/jobs/${id}`);
    fetchJobs();
  }
}

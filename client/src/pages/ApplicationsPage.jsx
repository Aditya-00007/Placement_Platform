import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [filters, setFilters] = useState({
    job: "ALL",
    status: "ALL",
    sort: "recent",
  });

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/employer/jobs-list");

      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setJobs([]);
    }
  };

  const fetchApplications = async () => {
    const res = await axios.get("/api/employer/applications", {
      params: filters,
    });
    setApplications(Array.isArray(res.data) ? res.data : []);
  };

  const updateStatus = async (id, status) => {
    await axios.patch(`/api/employer/applications/${id}`, { status });
    fetchApplications();
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-4">Applications</h1>

        {/* FILTERS */}
        <div className="flex gap-4 mb-4">
          {/* Job Filter */}
          <select
            onChange={(e) => setFilters({ ...filters, job: e.target.value })}
            className="border p-2"
          >
            <option value="ALL">All Jobs</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border p-2"
          >
            <option value="ALL">All Status</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="REJECTED">Rejected</option>
            <option value="HIRED">Hired</option>
          </select>

          {/* Sort */}
          <select
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
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
                <th className="p-3">Candidate</th>
                <th className="p-3">Job</th>
                <th className="p-3">Match %</th>
                <th className="p-3">Status</th>
                <th className="p-3">Applied</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-t">
                    <td className="p-3">{app.candidate_name}</td>
                    <td className="p-3">{app.job_title}</td>

                    {/* MATCH SCORE */}
                    <td className="p-3">
                      <span className="font-bold text-blue-600">
                        {app.match_score}%
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white
                      ${getStatusColor(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(app.applied_at).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => updateStatus(app.id, "SHORTLISTED")}
                        className="text-green-600"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() => updateStatus(app.id, "REJECTED")}
                        className="text-red-600"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => updateStatus(app.id, "HIRED")}
                        className="text-blue-600"
                      >
                        Hire
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
}

/* STATUS COLOR */
function getStatusColor(status) {
  switch (status) {
    case "APPLIED":
      return "bg-gray-500";
    case "SHORTLISTED":
      return "bg-green-500";
    case "REJECTED":
      return "bg-red-500";
    case "HIRED":
      return "bg-blue-500";
    default:
      return "bg-gray-400";
  }
}

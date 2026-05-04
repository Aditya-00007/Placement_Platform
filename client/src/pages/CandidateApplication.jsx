import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import CandidateJobViewModal from "../components/modals/CandidateJobViewModel";

export default function CandidateApplications() {
  const [applications, setApplications] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetchApplications(); // ✅ IMPORTANT FIX
  }, []);

  // ✅ FETCH APPLICATIONS
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/candidate/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Applications:", res.data);

      setApplications(res.data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplications([]);
    }
  };

  // ✅ STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-700";
      case "SHORTLISTED":
        return "bg-yellow-100 text-yellow-700";
      case "HIRED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Applications</h1>

        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Job Title</th>
                <th className="p-3">Location</th>
                <th className="p-3">Type</th>
                <th className="p-3">Applied On</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th> {/* ✅ NEW */}
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
                    <td className="p-3">{app.title}</td>
                    <td className="p-3">{app.location}</td>
                    <td className="p-3">{app.job_type}</td>

                    <td className="p-3">
                      {new Date(app.applied_at).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* ✅ VIEW BUTTON */}
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedJobId(app.id); // ⚠️ if this doesn't work, use app.job_id
                          setShowViewModal(true);
                        }}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ VIEW MODAL */}
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
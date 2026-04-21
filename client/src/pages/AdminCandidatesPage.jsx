import { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "../components/AdminDashboardLayout";
import AdminCandidateViewModal from "../components/modals/AdminCandidateViewModal";

const AdminCandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`/api/admin/candidates?search=${search}`, {
        headers: {
          Authorization: token,
        },
      });

      setCandidates(res.data.candidates || []);
    } catch (err) {
      console.error("Fetch candidates error:", err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [search]);

  const deleteCandidate = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/admin/candidates/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchCandidates();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Candidates</h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search candidates..."
          className="border p-2 mb-4 w-full rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Location</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Skills</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {candidates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No candidates found
                  </td>
                </tr>
              ) : (
                candidates.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3">{c.name}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.current_location}</td>
                    <td className="p-3">{c.experience_years} yrs</td>

                    <td className="p-3">{c.skills?.slice(0, 3).join(", ")}</td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedId(c.id);
                          setShowModal(true);
                        }}
                        className="px-2 cursor-pointer py-1 bg-blue-100 text-blue-600 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm("Delete this candidate?")) {
                            deleteCandidate(c.id);
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
      <AdminCandidateViewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        candidateId={selectedId}
      />
    </AdminDashboardLayout>
  );
};

export default AdminCandidatesPage;

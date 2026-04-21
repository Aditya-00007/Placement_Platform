import { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "../components/AdminDashboardLayout";

const AdminEmployersPage = () => {
  const [employers, setEmployers] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const fetchEmployers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`/api/admin/employers?filter=${filter}`, {
        headers: {
          Authorization: token,
        },
      });

      setEmployers(res.data.employers || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, [filter]);

  const approveEmployer = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `/api/admin/employers/${id}/approve`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );

      fetchEmployers();
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const rejectEmployer = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `/api/admin/employers/${id}/reject`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );

      fetchEmployers();
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Employers</h1>

        {/* FILTER */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 mb-4 rounded"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
        </select>

        {/* TABLE */}
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Company</th>
                <th className="p-3">Email</th>
                <th className="p-3">Industry</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No employers found
                  </td>
                </tr>
              ) : (
                employers.map((e) => (
                  <tr key={e.employer_id} className="border-t">
                    <td className="p-3">{e.company_name}</td>
                    <td className="p-3">{e.contact_email}</td>
                    <td className="p-3">{e.industry}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white 
                        ${e.is_approved ? "bg-green-500" : "bg-yellow-500"}`}
                      >
                        {e.is_approved ? "Approved" : "Pending"}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">
                      {!e.is_approved && (
                        <button
                          onClick={() => approveEmployer(e.employer_id)}
                          className="px-2 cursor-pointer py-1 bg-green-100 text-green-700 rounded"
                        >
                          Approve
                        </button>
                      )}

                      <button
                        onClick={() => rejectEmployer(e.employer_id)}
                        className="px-2 cursor-pointer py-1 bg-red-100 text-red-600 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminEmployersPage;

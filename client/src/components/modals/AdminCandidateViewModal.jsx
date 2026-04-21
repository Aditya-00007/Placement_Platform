import { useEffect, useState } from "react";
import axios from "axios";

const AdminCandidateViewModal = ({ isOpen, onClose, candidateId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!candidateId || !isOpen) return;

    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`/api/admin/candidates/${candidateId}`, {
          headers: {
            Authorization: token,
          },
        });

        setData(res.data);
      } catch (err) {
        console.error("Fetch candidate error:", err);
      }
    };

    fetchDetails();
  }, [candidateId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto rounded-lg p-6 relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-3 text-gray-500"
        >
          ✖
        </button>

        {!data ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* BASIC */}
            <h2 className="text-2xl font-bold">{data.basic.name}</h2>
            <p className="text-gray-600">{data.basic.email}</p>

            {/* PROFILE */}
            {data.profile && (
              <div className="mt-4">
                <h3 className="font-semibold">Profile</h3>
                <p>Location: {data.profile.current_location}</p>
                <p>Experience: {data.profile.experience_years} years</p>
              </div>
            )}

            {/* SKILLS */}
            <div className="mt-4">
              <h3 className="font-semibold">Skills</h3>
              <div className="flex gap-2 flex-wrap">
                {data.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-600 px-2 py-1 rounded"
                  >
                    {s.skill_name}
                  </span>
                ))}
              </div>
            </div>

            {/* EDUCATION */}
            <div className="mt-4">
              <h3 className="font-semibold">Education</h3>
              {data.education.map((e, i) => (
                <div key={i} className="border-b py-2">
                  <p>
                    {e.level} - {e.institute_name}
                  </p>
                  <p className="text-sm text-gray-500">{e.passing_year}</p>
                </div>
              ))}
            </div>

            {/* EXPERIENCE */}
            <div className="mt-4">
              <h3 className="font-semibold">Experience</h3>
              {data.experience.map((exp, i) => (
                <div key={i} className="border-b py-2">
                  <p>
                    {exp.job_title} @ {exp.company_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {exp.start_date} - {exp.end_date || "Present"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminCandidateViewModal;

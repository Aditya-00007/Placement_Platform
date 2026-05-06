import axios from "axios";
import { useEffect, useState } from "react";

const CandidateProfileModal = ({ candidateId, onClose }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/employer/candidate/${candidateId}`, {
        headers: {
          Authorization:`Bearer ${token}`,
        },
        withCredentials: true,
      });

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl">Loading...</div>
      </div>
    );
  }

  const { profile, education, experience, projects, skills, certifications } =
    data;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto my-10 bg-white rounded-2xl p-8 relative">
        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          ✕
        </button>

        {/* HEADER */}
        <div className="flex gap-6 items-center border-b pb-6">
          <img
            src={profile?.profile_photo || "https://via.placeholder.com/120"}
            alt=""
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-3xl font-bold">{profile?.full_name}</h2>

            <p className="text-gray-600">{profile?.email}</p>

            <p className="text-gray-600">{profile?.phone}</p>

            <p className="mt-2">
              Experience: {profile?.experience_years || 0} Years
            </p>

            <p>Expected Salary: ₹{profile?.expected_salary || "N/A"}</p>

            <p>Location: {profile?.current_location}</p>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Profile Summary</h3>

          <p className="text-gray-700">
            {profile?.profile_summary || "No summary added"}
          </p>
        </div>

        {/* LINKS */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Links</h3>

          <div className="flex flex-wrap gap-4">
            {profile?.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Resume
              </a>
            )}

            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                LinkedIn
              </a>
            )}

            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              >
                GitHub
              </a>
            )}

            {profile?.portfolio_url && (
              <a
                href={profile.portfolio_url}
                target="_blank"
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Skills</h3>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-gray-100 px-4 py-2 rounded-full"
              >
                {skill.skill_name} ({skill.proficiency})
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Experience</h3>

          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="border rounded-xl p-4">
                <h4 className="font-bold text-lg">{exp.job_title}</h4>

                <p className="text-gray-700">{exp.company_name}</p>

                <p className="text-sm text-gray-500">
                  {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                </p>

                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Education</h3>

          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border rounded-xl p-4">
                <h4 className="font-bold">{edu.level}</h4>

                <p>{edu.institute_name}</p>

                <p>{edu.field_of_study}</p>

                <p>
                  {edu.score} ({edu.grading_type})
                </p>

                <p>Passing Year: {edu.passing_year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Projects</h3>

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-xl p-4">
                <h4 className="font-bold text-lg">{project.project_title}</h4>

                <p className="mt-2">{project.description}</p>

                <p className="mt-2 text-sm">
                  Tech: {project.technologies_used}
                </p>

                <div className="flex gap-3 mt-3">
                  {project.project_link && (
                    <a
                      href={project.project_link}
                      target="_blank"
                      className="text-blue-600"
                    >
                      Live Project
                    </a>
                  )}

                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      className="text-black"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Certifications</h3>

          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="border rounded-xl p-4">
                <h4 className="font-bold">{cert.certificate_name}</h4>

                <p>{cert.issuing_organization}</p>

                <p>{cert.issue_date}</p>

                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    className="text-blue-600"
                  >
                    View Credential
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileModal;

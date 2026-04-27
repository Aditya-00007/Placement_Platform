import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function CandidateProfile() {
  const [data, setData] = useState({
    profile: {},
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("/api/candidate/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setData({
      profile: res.data.profile || {},
      education: res.data.education || [],
      experience: res.data.experience || [],
      projects: res.data.projects || [],
      skills: res.data.skills || [],
      certifications: res.data.certifications || [],
    });
  };

  // 🔹 Handle profile change
  const handleProfileChange = (e) => {
    setData({
      ...data,
      profile: { ...data.profile, [e.target.name]: e.target.value },
    });
  };

  // 🔹 Handle array change
  const handleArrayChange = (section, index, e) => {
    const updated = [...data[section]];
    updated[index][e.target.name] = e.target.value;

    setData({ ...data, [section]: updated });
  };

  // 🔹 Add new item
  const addItem = (section, template) => {
    setData({ ...data, [section]: [...data[section], template] });
  };

  // 🔹 Remove item
  const removeItem = (section, index) => {
    const updated = data[section].filter((_, i) => i !== index);
    setData({ ...data, [section]: updated });
  };

  // 🔹 Save
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    await axios.post("/api/candidate/profile", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setEditMode(false);
    fetchProfile();
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={data.profile.profile_photo || "/default.png"}
            className="w-20 h-20 rounded-full"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold">Candidate Profile</h2>

            {editMode && (
              <input
                name="profile_photo"
                value={data.profile.profile_photo || ""}
                onChange={handleProfileChange}
                className="border p-2 mt-2 w-full"
                placeholder="Image URL"
              />
            )}
          </div>
        </div>

        <button
          onClick={() => setEditMode(!editMode)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>

        {/* BASIC INFO */}
        <Section title="Basic Info">
          <Input label="Summary" name="profile_summary" value={data.profile.profile_summary} editMode={editMode} onChange={handleProfileChange} />
          <Input label="Experience Years" name="experience_years" value={data.profile.experience_years} editMode={editMode} onChange={handleProfileChange} />
          <Input label="Expected Salary" name="expected_salary" value={data.profile.expected_salary} editMode={editMode} onChange={handleProfileChange} />
          <Input label="Current Location" name="current_location" value={data.profile.current_location} editMode={editMode} onChange={handleProfileChange} />
          <Input label="Preferred Location" name="preferred_location" value={data.profile.preferred_location} editMode={editMode} onChange={handleProfileChange} />
          <Input label="LinkedIn" name="linkedin_url" value={data.profile.linkedin_url} editMode={editMode} onChange={handleProfileChange} />
          <Input label="GitHub" name="github_url" value={data.profile.github_url} editMode={editMode} onChange={handleProfileChange} />
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          {data.education.map((edu, i) => (
            <Card key={i}>
              <Input label="Level" name="level" value={edu.level} editMode={editMode} onChange={(e)=>handleArrayChange("education", i, e)} />
              <Input label="Institute" name="institute_name" value={edu.institute_name} editMode={editMode} onChange={(e)=>handleArrayChange("education", i, e)} />
              <Input label="Field" name="field_of_study" value={edu.field_of_study} editMode={editMode} onChange={(e)=>handleArrayChange("education", i, e)} />
              <Input label="Score" name="score" value={edu.score} editMode={editMode} onChange={(e)=>handleArrayChange("education", i, e)} />

              {editMode && <RemoveBtn onClick={()=>removeItem("education", i)} />}
            </Card>
          ))}
          {editMode && <AddBtn onClick={()=>addItem("education", {})} />}
        </Section>

        {/* EXPERIENCE */}
        <Section title="Experience">
          {data.experience.map((exp, i) => (
            <Card key={i}>
              <Input label="Company" name="company_name" value={exp.company_name} editMode={editMode} onChange={(e)=>handleArrayChange("experience", i, e)} />
              <Input label="Job Title" name="job_title" value={exp.job_title} editMode={editMode} onChange={(e)=>handleArrayChange("experience", i, e)} />
              <Input label="Description" name="description" value={exp.description} editMode={editMode} onChange={(e)=>handleArrayChange("experience", i, e)} />

              {editMode && <RemoveBtn onClick={()=>removeItem("experience", i)} />}
            </Card>
          ))}
          {editMode && <AddBtn onClick={()=>addItem("experience", {})} />}
        </Section>

        {/* PROJECTS */}
        <Section title="Projects">
          {data.projects.map((proj, i) => (
            <Card key={i}>
              <Input label="Title" name="project_title" value={proj.project_title} editMode={editMode} onChange={(e)=>handleArrayChange("projects", i, e)} />
              <Input label="Tech Used" name="technologies_used" value={proj.technologies_used} editMode={editMode} onChange={(e)=>handleArrayChange("projects", i, e)} />

              {editMode && <RemoveBtn onClick={()=>removeItem("projects", i)} />}
            </Card>
          ))}
          {editMode && <AddBtn onClick={()=>addItem("projects", {})} />}
        </Section>

        {/* SKILLS */}
        <Section title="Skills">
          {data.skills.map((skill, i) => (
            <Card key={i}>
              <Input label="Skill" name="skill_name" value={skill.skill_name} editMode={editMode} onChange={(e)=>handleArrayChange("skills", i, e)} />
              <Input label="Level" name="proficiency" value={skill.proficiency} editMode={editMode} onChange={(e)=>handleArrayChange("skills", i, e)} />

              {editMode && <RemoveBtn onClick={()=>removeItem("skills", i)} />}
            </Card>
          ))}
          {editMode && <AddBtn onClick={()=>addItem("skills", {})} />}
        </Section>

        {/* CERTIFICATIONS */}
        <Section title="Certifications">
          {data.certifications.map((cert, i) => (
            <Card key={i}>
              <Input label="Certificate" name="certificate_name" value={cert.certificate_name} editMode={editMode} onChange={(e)=>handleArrayChange("certifications", i, e)} />
              <Input label="Organization" name="issuing_organization" value={cert.issuing_organization} editMode={editMode} onChange={(e)=>handleArrayChange("certifications", i, e)} />

              {editMode && <RemoveBtn onClick={()=>removeItem("certifications", i)} />}
            </Card>
          ))}
          {editMode && <AddBtn onClick={()=>addItem("certifications", {})} />}
        </Section>

        {editMode && (
          <button
            onClick={handleSave}
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded"
          >
            Save Profile
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}

/* 🔹 UI Components */
function Section({ title, children }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <h3 className="font-bold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, name, value, editMode, onChange }) {
  return (
    <div className="mb-2">
      <label className="font-medium">{label}</label>
      {editMode ? (
        <input
          name={name}
          value={value || ""}
          onChange={onChange}
          className="border w-full p-2 mt-1"
        />
      ) : (
        <p>{value || "-"}</p>
      )}
    </div>
  );
}

function Card({ children }) {
  return <div className="border p-3 mb-2 rounded">{children}</div>;
}

function AddBtn({ onClick }) {
  return (
    <button onClick={onClick} className="bg-blue-400 text-white px-3 py-1 rounded">
      + Add
    </button>
  );
}

function RemoveBtn({ onClick }) {
  return (
    <button onClick={onClick} className="bg-red-400 text-white px-2 py-1 mt-2 rounded">
      Remove
    </button>
  );
}
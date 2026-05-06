import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(false);

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

  const handleProfileChange = (e) => {
    setData({
      ...data,
      profile: { ...data.profile, [e.target.name]: e.target.value },
    });
  };

  const handleArrayChange = (section, index, e) => {
    const updated = [...data[section]];
    updated[index][e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData({ ...data, [section]: updated });
  };

  // ✅ IMPORTANT: Proper templates
  const templates = {
    education: {
      level: "",
      board_university: "",
      institute_name: "",
      field_of_study: "",
      passing_year: "",
      grading_type: "",
      score: "",
    },
    experience: {
      company_name: "",
      job_title: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
    },
    projects: {
      project_title: "",
      description: "",
      technologies_used: "",
      project_link: "",
      github_link: "",
    },
    skills: {
      skill_name: "",
      proficiency: "",
    },
    certifications: {
      certificate_name: "",
      issuing_organization: "",
      issue_date: "",
      credential_url: "",
    },
  };

  const addItem = (section) => {
    setData({
      ...data,
      [section]: [...data[section], templates[section]],
    });
  };

  const removeItem = (section, index) => {
    setData({
      ...data,
      [section]: data[section].filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!data.profile.resume_url || !data.profile.profile_summary) {
        toast.error("Resume & Summary required!");
        return;
      }

      await axios.post(
        "/api/candidate/profile",
        {
          ...data.profile,
          education: data.education,
          experience: data.experience,
          projects: data.projects,
          skills: data.skills,
          certifications: data.certifications,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile Saved Successfully");
      setEditMode(false);
      fetchProfile();

    } catch (err) {
      console.error(err);
      toast.error("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-6">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Candidate Profile</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* PROFILE */}
        <Section title="Profile">
          <Input label="Profile Photo URL" name="profile_photo" value={data.profile.profile_photo} editMode={editMode} onChange={handleProfileChange}/>
          <Input label="Resume URL *" name="resume_url" value={data.profile.resume_url} editMode={editMode} onChange={handleProfileChange}/>
          <Input label="Summary *" name="profile_summary" value={data.profile.profile_summary} editMode={editMode} onChange={handleProfileChange}/>
        </Section>

        {/* BASIC */}
        <Section title="Basic Info">
          <Input label="Experience Years" name="experience_years" value={data.profile.experience_years} editMode={editMode} onChange={handleProfileChange}/>
          <Input label="Expected Salary" name="expected_salary" value={data.profile.expected_salary} editMode={editMode} onChange={handleProfileChange}/>
          <Input label="Current Location" name="current_location" value={data.profile.current_location} editMode={editMode} onChange={handleProfileChange}/>
          <Input label="Preferred Location" name="preferred_location" value={data.profile.preferred_location} editMode={editMode} onChange={handleProfileChange}/>
          <Input label="Current Address" name="current_address" value={data.profile.current_address} editMode={editMode} onChange={handleProfileChange}/>
          <Input label="Permanent Address" name="permanent_address" value={data.profile.permanent_address} editMode={editMode} onChange={handleProfileChange}/>
          <Input label="LinkedIn" name="linkedin_url" value={data.profile.linkedin_url} editMode={editMode} onChange={handleProfileChange}/>
          <Input label="GitHub" name="github_url" value={data.profile.github_url} editMode={editMode} onChange={handleProfileChange}/>
          <Input label="Portfolio" name="portfolio_url" value={data.profile.portfolio_url} editMode={editMode} onChange={handleProfileChange}/>
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          {data.education.map((edu, i) => (
            <Card key={i}>
              <Select label="Level" name="level" value={edu.level} editMode={editMode}
                onChange={(e)=>handleArrayChange("education", i, e)}
                options={["SSC","HSC","Diploma","Graduation","Post-Graduation"]}
              />
              <Input label="Board" name="board_university" value={edu.board_university} editMode={editMode} onChange={(e)=>handleArrayChange("education", i, e)}/>
              <Input label="Institute" name="institute_name" value={edu.institute_name} editMode={editMode} onChange={(e)=>handleArrayChange("education", i, e)}/>
              <Input label="Field" name="field_of_study" value={edu.field_of_study} editMode={editMode} onChange={(e)=>handleArrayChange("education", i, e)}/>
              <Input label="Passing Year" name="passing_year" value={edu.passing_year} editMode={editMode} onChange={(e)=>handleArrayChange("education", i, e)}/>
              <Select label="Grading Type" name="grading_type" value={edu.grading_type} editMode={editMode}
                onChange={(e)=>handleArrayChange("education", i, e)}
                options={["CGPA","PERCENTAGE"]}
              />
              <Input label="Score" name="score" value={edu.score} editMode={editMode} onChange={(e)=>handleArrayChange("education", i, e)}/>
              {editMode && <RemoveBtn onClick={()=>removeItem("education", i)} />}
            </Card>
          ))}
          {editMode && <AddBtn onClick={()=>addItem("education")} />}
        </Section>

        {/* EXPERIENCE */}
        <Section title="Experience">
          {data.experience.map((exp, i) => (
            <Card key={i}>
              <Input label="Company" name="company_name" value={exp.company_name} editMode={editMode} onChange={(e)=>handleArrayChange("experience", i, e)}/>
              <Input label="Job Title" name="job_title" value={exp.job_title} editMode={editMode} onChange={(e)=>handleArrayChange("experience", i, e)}/>
              <Input type="date" label="Start Date" name="start_date" value={exp.start_date} editMode={editMode} onChange={(e)=>handleArrayChange("experience", i, e)}/>
              <Input type="date" label="End Date" name="end_date" value={exp.end_date} editMode={editMode} onChange={(e)=>handleArrayChange("experience", i, e)}/>
              
              {/* ✅ FIXED */}
              <Checkbox label="Currently Working" name="is_current" checked={exp.is_current} editMode={editMode}
                onChange={(e)=>handleArrayChange("experience", i, e)}
              />

              <Input label="Description" name="description" value={exp.description} editMode={editMode} onChange={(e)=>handleArrayChange("experience", i, e)}/>
            </Card>
          ))}
          {editMode && <AddBtn onClick={()=>addItem("experience")} />}
        </Section>

        {/* SKILLS */}
        <Section title="Skills">
          {data.skills.map((s, i) => (
            <Card key={i}>
              <Input label="Skill" name="skill_name" value={s.skill_name} editMode={editMode} onChange={(e)=>handleArrayChange("skills", i, e)}/>
              <Select label="Proficiency" name="proficiency" value={s.proficiency} editMode={editMode}
                onChange={(e)=>handleArrayChange("skills", i, e)}
                options={["BEGINNER","INTERMEDIATE","ADVANCED"]}
              />
            </Card>
          ))}
          {editMode && <AddBtn onClick={()=>addItem("skills")} />}
        </Section>

        {editMode && (
          <button onClick={handleSave} className="bg-green-600 text-white w-full py-3 mt-6 rounded">
            {loading ? "Saving..." : "Save Profile"}
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}

/* UI COMPONENTS */

const Section = ({ title, children }) => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <h3 className="font-bold mb-2">{title}</h3>
    {children}
  </div>
);

const Input = ({ label, name, value, editMode, onChange, type="text" }) => (
  <div className="mb-2">
    <label>{label}</label>
    {editMode ? (
      <input type={type} name={name} value={value || ""} onChange={onChange} className="border w-full p-2 rounded"/>
    ) : <p>{value || "-"}</p>}
  </div>
);

const Select = ({ label, name, value, editMode, onChange, options }) => (
  <div className="mb-2">
    <label>{label}</label>
    {editMode ? (
      <select name={name} value={value || ""} onChange={onChange} className="border w-full p-2 rounded">
        <option value="">Select</option>
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    ) : <p>{value || "-"}</p>}
  </div>
);

const Checkbox = ({ label, name, checked, editMode, onChange }) => (
  <div className="mb-2 flex items-center gap-2">
    {editMode ? (
      <>
        <input type="checkbox" name={name} checked={checked || false} onChange={onChange}/>
        <label>{label}</label>
      </>
    ) : <p>{checked ? "Yes" : "No"}</p>}
  </div>
);

const Card = ({ children }) => (
  <div className="border p-3 mb-2 rounded bg-gray-50">{children}</div>
);

const AddBtn = ({ onClick }) => (
  <button onClick={onClick} className="bg-blue-500 text-white px-3 py-1 mt-2 rounded">+ Add</button>
);

const RemoveBtn = ({ onClick }) => (
  <button onClick={onClick} className="bg-red-500 text-white px-2 py-1 mt-2 rounded">Remove</button>
);
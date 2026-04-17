import { useState } from "react";

export default function CreateJobModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    location: "",
    job_type: "FULL_TIME",
    work_mode: "ONSITE",
    salary_min: "",
    salary_max: "",
    experience_required: 0,
    skills_required: "",
    application_deadline: "",
    min_education: "",
    min_cgpa: "",
    allowed_branches: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      salary_min: Number(formData.salary_min),
      salary_max: Number(formData.salary_max),
      experience_required: Number(formData.experience_required),
      skills_required: formData.skills_required.split(",").map((s) => s.trim()),
      allowed_branches: formData.allowed_branches
        .split(",")
        .map((b) => b.trim()),
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6">Create Job</h2>

        <div className="grid grid-cols-2 gap-6">
          <input
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            className="input"
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="input"
          />

          <select name="job_type" onChange={handleChange} className="input">
            <option>FULL_TIME</option>
            <option>PART_TIME</option>
            <option>INTERNSHIP</option>
            <option>CONTRACT</option>
          </select>

          <select name="work_mode" onChange={handleChange} className="input">
            <option>ONSITE</option>
            <option>REMOTE</option>
            <option>HYBRID</option>
          </select>

          <input
            name="salary_min"
            type="number"
            placeholder="Min Salary"
            onChange={handleChange}
            className="input"
          />
          <input
            name="salary_max"
            type="number"
            placeholder="Max Salary"
            onChange={handleChange}
            className="input"
          />

          <input
            name="experience_required"
            type="number"
            placeholder="Experience (years)"
            onChange={handleChange}
            className="input"
          />

          <input
            name="application_deadline"
            type="date"
            onChange={handleChange}
            className="input"
          />

          <input
            name="skills_required"
            placeholder="Skills (comma separated)"
            onChange={handleChange}
            className="col-span-2 input"
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="col-span-2 input"
          />

          <textarea
            name="requirements"
            placeholder="Requirements"
            onChange={handleChange}
            className="col-span-2 input"
          />

          <textarea
            name="responsibilities"
            placeholder="Responsibilities"
            onChange={handleChange}
            className="col-span-2 input"
          />

          <h3 className="col-span-2 font-semibold mt-4">Eligibility</h3>

          <input
            name="min_education"
            placeholder="Minimum Education"
            onChange={handleChange}
            className="input"
          />

          <input
            name="min_cgpa"
            type="number"
            step="0.01"
            placeholder="Min CGPA"
            onChange={handleChange}
            className="input"
          />

          <input
            name="allowed_branches"
            placeholder="Allowed Branches (comma separated)"
            onChange={handleChange}
            className="col-span-2 input"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl"
          >
            Create Job
          </button>
        </div>
      </div>
    </div>
  );
}

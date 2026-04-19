import { useState, useEffect } from "react";

export default function EditJobModal({ isOpen, onClose, onSubmit, jobData }) {
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

  useEffect(() => {
    if (jobData) {
      setFormData({
        ...jobData,
        status: jobData.status || "OPEN",
        salary_min: jobData.salary_min || "",
        salary_max: jobData.salary_max || "",
        experience_required: jobData.experience_required || 0,

        skills_required: jobData.skills_required?.join(", ") || "",

        application_deadline: jobData.application_deadline
          ? jobData.application_deadline.split("T")[0]
          : "",

        //  read from nested eligibility
        min_education: jobData.eligibility?.min_education || "",
        min_cgpa: jobData.eligibility?.min_cgpa || "",
        allowed_branches:
          jobData.eligibility?.allowed_branches?.join(", ") || "",
      });
    }
  }, [jobData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements,
      responsibilities: formData.responsibilities,
      location: formData.location,
      job_type: formData.job_type,
      work_mode: formData.work_mode,
      salary_min: Number(formData.salary_min) || 0,
      salary_max: Number(formData.salary_max) || 0,
      status: formData.status,
      experience_required: Number(formData.experience_required) || 0,
      skills_required: formData.skills_required.split(",").map((s) => s.trim()),
      application_deadline: formData.application_deadline,

      eligibility: {
        min_education: formData.min_education,
        min_cgpa: Number(formData.min_cgpa) || 0,
        allowed_branches: formData.allowed_branches
          .split(",")
          .map((b) => b.trim()),
      },
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-3xl p-6 overflow-y-auto max-h-[90vh] relative">
        {/*  Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        {/*  Title */}
        <h2 className="text-2xl font-bold mb-6">Edit Job</h2>

        <div className="grid grid-cols-2 gap-6">
          <input
            name="title"
            value={formData.title}
            placeholder="Job Title"
            onChange={handleChange}
            className="input"
          />

          <input
            name="location"
            value={formData.location}
            placeholder="Location"
            onChange={handleChange}
            className="input"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input"
          >
            <option value="OPEN">OPEN</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="input"
          >
            <option>FULL_TIME</option>
            <option>PART_TIME</option>
            <option>INTERNSHIP</option>
            <option>CONTRACT</option>
          </select>

          <select
            name="work_mode"
            value={formData.work_mode}
            onChange={handleChange}
            className="input"
          >
            <option>ONSITE</option>
            <option>REMOTE</option>
            <option>HYBRID</option>
          </select>

          <input
            name="salary_min"
            type="number"
            value={formData.salary_min}
            placeholder="Min Salary"
            onChange={handleChange}
            className="input"
          />

          <input
            name="salary_max"
            type="number"
            value={formData.salary_max}
            placeholder="Max Salary"
            onChange={handleChange}
            className="input"
          />

          <input
            name="experience_required"
            type="number"
            value={formData.experience_required}
            placeholder="Experience (years)"
            onChange={handleChange}
            className="input"
          />

          <div>
            <label className="text-sm text-gray-600">
              Application Deadline
            </label>
            <input
              name="application_deadline"
              type="date"
              value={formData.application_deadline}
              onChange={handleChange}
              className="input"
            />
          </div>

          <input
            name="skills_required"
            value={formData.skills_required}
            placeholder="Skills (comma separated)"
            onChange={handleChange}
            className="col-span-2 input"
          />

          <textarea
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
            className="col-span-2 input"
          />

          <textarea
            name="requirements"
            value={formData.requirements}
            placeholder="Requirements"
            onChange={handleChange}
            className="col-span-2 input"
          />

          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            placeholder="Responsibilities"
            onChange={handleChange}
            className="col-span-2 input"
          />

          <h3 className="col-span-2 font-semibold mt-4">Eligibility</h3>

          <input
            name="min_education"
            value={formData.min_education}
            placeholder="Minimum Education"
            onChange={handleChange}
            className="input"
          />

          <input
            name="min_cgpa"
            type="number"
            step="0.01"
            value={formData.min_cgpa}
            placeholder="Min CGPA"
            onChange={handleChange}
            className="input"
          />

          <input
            name="allowed_branches"
            value={formData.allowed_branches}
            placeholder="Allowed Branches (comma separated)"
            onChange={handleChange}
            className="col-span-2 input"
          />
        </div>

        {/* 🔹 Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-xl"
          >
            Update Job
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";

export default function EmployerProfile() {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await axios.get("/api/employer/profile");
    setProfile(res.data);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("/api/employer/profile", profile);
    setEditMode(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profile.company_logo_url || "/default.png"}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">
            {profile.company_name || "Company Name"}
          </h2>
          <p className="text-gray-500">
            {profile.industry} • {profile.employee_count} employees
          </p>
        </div>
      </div>

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setEditMode(!editMode)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editMode ? "Cancel" : "Edit Profile"}
      </button>

      {/* FORM / VIEW */}
      <div className="grid grid-cols-2 gap-4">
        {/* Company Name */}
        <InputField
          label="Company Name"
          name="company_name"
          value={profile.company_name}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* Industry */}
        <InputField
          label="Industry"
          name="industry"
          value={profile.industry}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* Employee Count */}
        <InputField
          label="Employee Count"
          name="employee_count"
          value={profile.employee_count}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* Website */}
        <InputField
          label="Website"
          name="company_website"
          value={profile.company_website}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* Address */}
        <InputField
          label="Address"
          name="address"
          value={profile.address}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* City */}
        <InputField
          label="City"
          name="city"
          value={profile.city}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* State */}
        <InputField
          label="State"
          name="state"
          value={profile.state}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* Country */}
        <InputField
          label="Country"
          name="country"
          value={profile.country}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* Contact Email */}
        <InputField
          label="Contact Email"
          name="contact_email"
          value={profile.contact_email}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* Phone */}
        <InputField
          label="Phone"
          name="contact_phone"
          value={profile.contact_phone}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* HR Name */}
        <InputField
          label="HR Name"
          name="hr_name"
          value={profile.hr_name}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* Founded Year */}
        <InputField
          label="Founded Year"
          name="founded_year"
          value={profile.founded_year}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* LinkedIn */}
        <InputField
          label="LinkedIn"
          name="linkedin_url"
          value={profile.linkedin_url}
          editMode={editMode}
          onChange={handleChange}
        />

        {/* Twitter */}
        <InputField
          label="Twitter"
          name="twitter_url"
          value={profile.twitter_url}
          editMode={editMode}
          onChange={handleChange}
        />
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <label className="font-semibold">Company Description</label>
        {editMode ? (
          <textarea
            name="company_description"
            value={profile.company_description || ""}
            onChange={handleChange}
            className="w-full border p-2 mt-2"
          />
        ) : (
          <p className="mt-2 text-gray-700">
            {profile.company_description || "No description"}
          </p>
        )}
      </div>

      {/* SAVE BUTTON */}
      {editMode && (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded"
        >
          Save Profile
        </button>
      )}
    </div>
  );
}

/* Reusable Input Component */
function InputField({ label, name, value, editMode, onChange }) {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      {editMode ? (
        <input
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full border p-2 mt-1"
        />
      ) : (
        <p className="mt-1 text-gray-700">{value || "-"}</p>
      )}
    </div>
  );
}

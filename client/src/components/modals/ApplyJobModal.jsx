import { useState } from "react";

export default function ApplyJobModal({ isOpen, onClose, onSubmit, job }) {
  const [coverLetter, setCoverLetter] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const payload = {
      job_id: job.id,
      cover_letter: coverLetter,
    };

    onSubmit(payload);
    setCoverLetter("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>

        {/* Job Info */}
        <div className="mb-4 p-3 bg-gray-100 rounded-xl">
          <p className="font-semibold">{job.title}</p>
          <p className="text-sm text-gray-600">{job.location}</p>
        </div>

        {/* Cover Letter */}
        <textarea
          placeholder="Write your cover letter..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full border p-3 rounded-xl min-h-30"
        />

        <div className="flex justify-end gap-3 mt-5">
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
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

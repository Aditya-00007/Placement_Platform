import { useState } from "react";
import UploadCSVModal from "../components/modals/UploadCSVModal";
import AdminDashboardLayout from "../components/AdminDashboardLayout";

export default function AdminQuestionsPage() {
  const [open, setOpen] = useState(false);

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Questions</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Upload CSV
        </button>

        <UploadCSVModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </AdminDashboardLayout>
  );
}

import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-500 mb-4">403</h1>

        <h2 className="text-xl font-semibold mb-2">Access Denied 🚫</h2>

        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

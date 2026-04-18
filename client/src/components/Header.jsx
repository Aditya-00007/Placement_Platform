export default function Header({ toggleSidebar }) {
  return (
    <nav className="h-[60px] bg-white shadow-sm px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="px-3 py-2 border rounded-md hover:bg-gray-100"
        >
          ☰
        </button>

        <h1 className="font-bold">Employer Panel</h1>
      </div>
    </nav>
  );
}

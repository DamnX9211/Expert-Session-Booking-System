import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ExpertLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow">
        <div className="text-2xl font-bold mb-6">Expert Panel</div>
        <nav className="space-y-4">
          <Link
            to="/expert/dashboard"
            className="block py-2 px-4 hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            to="/expert/availability"
            className="block py-2 px-4 hover:bg-gray-200"
          >
            Availability
          </Link>
          <Link
            to="/expert/sessions"
            className="block py-2 px-4 hover:bg-gray-200"
          >
            Sessions
          </Link>
        </nav>
      </aside>
      {/* Main Content */}
      <div>
        {/* Topbar */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <span className="text-2xl font-bold">Welcome {user?.name || "Expert"}</span>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </header>

        {/* page Content  */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

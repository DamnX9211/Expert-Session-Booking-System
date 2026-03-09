import { useAuth } from "../../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

export default function Adminlayout() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white p-6 shadow">
                <div className="text-2xl font-bold mb-6">
                    Admin Panel
                </div>
                <nav className="space-y-4">
                    <Link to="/admin/experts" className="block py-2 px-4 hover:bg-gray-200">
                        Experts
                    </Link>
                    <Link to="/admin/bookings" className="block py-2 px-4 hover:bg-gray-200">
                        Bookings
                    </Link>
                    <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-200">
                        Users
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                <header className="bg-white shadow">
                    <span className="font-semibold">Admin: {user?.name || "Admin"}</span>
                    <button onClick={logout} className="ml-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                        Logout
                    </button>
                </header>
                <main className="p-6">
                    <AdminDashboard />
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
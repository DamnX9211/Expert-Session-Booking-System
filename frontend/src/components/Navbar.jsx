import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <header className="bg-white p-4 shadow flex justify-between items-center"   >
            <Link to="/" className="text-2xl font-bold">
            ExpertConnect
            </Link>
            <div>
                <Link to="/register?role=user" className="mr-4 text-blue-500">
                Join as User
                </Link>

                <Link to="/register?role=expert" className="text-blue-500">
                Join as Expert
                </Link>
            </div>
        </header>
    )
}
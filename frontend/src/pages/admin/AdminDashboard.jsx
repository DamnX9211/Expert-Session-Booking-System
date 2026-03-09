export default function AdminDashboard() {

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold">
                Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Users</h2>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Experts</h2>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Bookings</h2>
                </div>
            </div>

        </div>
    )

}
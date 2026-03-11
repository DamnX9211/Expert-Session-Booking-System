import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Experts() {
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExperts = async () => {
        try {
            const res = await API.get("/admin/experts")

            setExperts(res.data || []);
        } catch (error) {
            console.log(error);
            setExperts([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchExperts();
    }, [])

    const approveExpert = async (id) => {
        try {
            await API.patch(`/admin/experts/${id}/approve`);
            fetchExperts();
        } catch (error) {
            alert("Failed to approve expert. Please try again.");
            console.log(error);
        }
    }

    if (loading) {
        return <p className="p-6">Loading Experts...</p>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Expert Approval</h1>
            <div>
                {experts.length === 0 ? (
                    <p className="text-gray-500">No experts pending approval.</p>
                ) : (
                    experts.map(expert => (
                        <div key={expert._id} className="border p-4 mb-4">
                            <div>
                                <p className="text-xl font-bold">{expert.name}</p>
                                <p className="text-gray-600">{expert.email}</p>
                                <p className="text-gray-600">Status: {expert.status}</p>
                            </div>
                            {expert.status === "pending" && (
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                                    onClick={() => approveExpert(expert._id)}
                                >Approve</button>
                            )}
                        </div>
                    )
                    )
                )}
            </div>
        </div>
    )
}
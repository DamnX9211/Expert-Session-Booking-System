import { useEffect, useState } from "react";
import API from "../../services/api";


export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchbookings = async () => {
        try {
            const res = await API.get("/admin/bookings");
            setBookings(res.data.bookings || []);
        } catch (error) {
            console.log(error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchbookings();
    }, [])

    const cancelBooking = async (id) => {
        try {
            await API.patch(`/admin/bookings/${id}/cancel`);
            fetchbookings();
        } catch (error) {
            alert("Failed to cancel booking. Please try again.");
            console.log(error);
        }
    }

    if (loading) {
        return <p>Loading bookings...</p>;
    }

    return (
        <div>

            <h1 className="text-2xl font-bold mb-6">
                Platform Bookings
            </h1>

            <div className="space-y-4">

                {bookings.map(booking => {

                    return (

                        <div
                            key={booking._id}
                            className="border p-4 rounded flex justify-between"
                        >

                            <div>

                                <p className="font-medium">
                                    {booking.user.name}
                                </p>

                                <p className="text-sm text-gray-600">
                                    Expert: {booking.expert.name}
                                </p>

                                <p className="text-sm">

                                    {new Date(booking.date)
                                        .toLocaleDateString()}

                                    {" | "}

                                    {booking.timeSlot}

                                </p>

                                <p className="text-sm">
                                    Status: {booking.status}
                                </p>

                            </div>

                            {booking.status !== "Cancelled" && (

                                <button
                                    onClick={() =>
                                        cancelBooking(booking._id)
                                    }
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Cancel
                                </button>

                            )}

                        </div>

                    )

                })}

            </div>

        </div>

    );
}
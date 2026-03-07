import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/bookings/me");
      const dataArray = res.data.bookings || res.data.data || [];
      setBookings(Array.isArray(dataArray) ? dataArray : []);
    } catch (err) {
      console.log(err);
      setBookings([]);
      setError("Failed to fetch bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading Bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found.</p>
      )}

      <div className="space-y-4">
        {bookings.map((booking)=> (
          <div key={booking._id} className="border p-4 rounded mb-4">
            <p className="text-gray-900">{booking.expert?.name || "Unknown Expert"}</p>
            <p>
              <b>Category:</b> {booking.expert?.category || "N/A"}
            </p>
            <p>
              <b>Date:</b> {new Date(booking.date).toLocaleDateString()}
            </p>
            <p>
              <b>Time:</b> {booking.timeSlot}
            </p>

            <p>
              <b>Status:</b> <span>{booking.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

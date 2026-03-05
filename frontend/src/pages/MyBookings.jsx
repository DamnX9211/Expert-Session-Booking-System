import { useState } from "react";
import API from "../services/api";

export default function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    if (!email) {
      return setError("Please enter your email to view bookings.");
    }
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/bookings", {
        params: {
          email,
        },
      });
      setBookings(res.data.data || res.data);
    } catch {
      setError("Failed to fetch bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <div>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={fetchBookings}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm mt-2"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading Bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        {bookings?.map((booking) => (
          <div key={booking._id} className="border p-4 rounded mb-4">
            <p className="text-gray-900">{booking.expert.name}</p>
            <p>
              <b>Category:</b> {booking.expert.category}
            </p>
            <p>
              <b>Date:</b> {new Date(booking.date).toLocaleDateString()}
            </p>
            <p>
              <b>Time:</b> {booking.timeSlot}
            </p>

            <p>
              Status: <span>{booking.status}</span>
            </p>
          </div>
        ))}
      </div>
      {!loading && bookings.length === 0 && (
        <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}

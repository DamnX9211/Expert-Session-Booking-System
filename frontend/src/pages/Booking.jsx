import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SlotSelector from "../components/SlotSelector";

export default function Booking() {
  const { id } = useParams();

  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);

  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!date || !slot || !phone) {
      return setError("Please select slot and enter phone number.");
    }

    try {
      setLoading(true);
      setError("");

      await API.post("/bookings", {
        expertId: id,
        phone,
        date: date.toISOString().split("T")[0],
        timeSlot: slot,
        notes,
      });

      setMessage("Booking successful! We will contact you soon.");
    } catch (error) {
      if (error.response?.status === 409) {
        setError("Failed to submit booking. Please try again.");
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to submit booking. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Book Session</h1>

      <div className="mb-4 text-gray-700">
        <label className="">Select Date</label>

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="border p-2 rounded w-full"
        />
      </div>

      <SlotSelector 
      expertId={id}
      date={date?.toISOString().split("T")[0]}
      onSelect={(slot) => setSlot(slot)}
      />

      {slot && (
        <p className="mt-4 text-gray-700">
          <b>Selected Slot:</b> {slot}
        </p>
      )}

      <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded w-full mt-6"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 rounded w-full mt-4"
        />
        <button
          onClick={handleBooking}
          disabled={loading}
          className=" bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "booking..." : "Confirm Booking"}
        </button>

        {message && (
          <p className="text-green-500 mt-4">{message}</p>
        )}
        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
    </div>
  );
}

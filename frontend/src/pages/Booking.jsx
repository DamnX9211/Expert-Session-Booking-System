import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import API from "../services/api";

export default function Booking() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const date = searchParams.get("date");
  const timeSlot = searchParams.get("slot");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      return setError("Please fill in all required fields.");
    }

    try {
      setLoading(true);
      setError("");

      await API.post("/bookings", {
        expertId: id,
        ...form,
        date,
        timeSlot,
      });

      setMessage("Booking successful! We will contact you soon.");

      setForm({
        name: "",
        email: "",
        phone: "",
        notes: "",
      });
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
      <h1 className="text-2xl font-bold mb-6">Book Expert Session</h1>

      <div className="mb-4 text-gray-700">
        <p>
          <b>Date:</b>
          {date}
        </p>
        <p>
          <b>Time Slot:</b>
          {timeSlot}
        </p>
      </div>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md space-y-4 mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className=" bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

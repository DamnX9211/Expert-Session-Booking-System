import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import socket from "../services/socket";
import { useEffect, useState, useCallback } from "react";

export default function ExpertDetail() {
  const { id } = useParams();

  const [expert, setExpert] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const expertRes = await API.get(`/experts/${id}`);
      const slotsRes = await API.get(`/experts/${id}/slots`);

      setExpert(expertRes.data);
      setSlots(slotsRes.data.availableSlots);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load expert details",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
    socket.emit("joinExpertRoom", id);
    socket.on("slotBooked", ({ expertId, date, timeSlot }) => {
      if (expertId !== id) return;

      setSlots((prevSlots) =>
        prevSlots.map((day) => {
          if (day.date !== date) return day;

          return {
            ...day,
            slots: day.slots.filter((slot) => slot !== timeSlot),
          };
        }),
      );
    });

    return () => {
      socket.off("slotBooked");
      socket.emit("leaveExpertRoom", id);
    };
  }, [fetchData, id]);

  if (loading) return <p className="p-6">Loading expert...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!expert) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{expert.name}</h1>
      <p className="text-gray-600">Category: {expert.category}</p>
      <p className="text-gray-600">Experience: {expert.experience} years</p>
      <p className="mt-2">Bio: {expert.bio}</p>
      <h2 className="text-xl font-bold mt-8 mb-4">Available Slots</h2>
      {slots.map((day) => (
        <div key={day.date} className="mb-6">
          <p className="font-semibold mb-2">{day.date}</p>
          <div className="flex gap-4 flex-wrap mt-2">
            {day.slots.length === 0 && <p>No slots available</p>}
            {day.slots.map((slot) => (
              <Link key={slot} to={`/book/${id}?date=${day.date}&slot=${slot}`}>
                <button className="px-4 py-2 bg-gray-200 rounded">
                  {slot}
                </button>
              </Link>
            ))}
          </div>
        </div>
      ))}
      ;
    </div>
  );
}

import { useEffect } from "react";
import { useState } from "react";
import API from "../../services/api";

export default function Availability() {
  const [availability, setAvailability] = useState([]);
  const [form, setForm] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    slotDuration: 30,
  });

  const [loading, setLoading] = useState(false);
  

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const fetchAvailability = async () => {
    try {
      const res = await API.get("/experts/me/availability");
      setAvailability(res.data);
    } catch (err) {
      console.log(err);
      
    }
  };
  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/experts/me/availability", form);

      setForm({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        slotDuration: 30,
      });
      fetchAvailability();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/experts/me/availability/${id}`);
      fetchAvailability();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to delete availability");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Availability</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="dayOfWeek"
          value={form.dayOfWeek}
          onChange={handleChange}
          className="border p-2 rounded w-full "
          required
        >
          <option value="">Select Day</option>
          {days.map((day, index) => (
            <option value={index} key={index}>
              {day}
            </option>
          ))}
        </select>

        <input
          type="time"
          name="startTime"
          placeholder="time"
          value={form.startTime}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="slotDuration"
          value={form.slotDuration}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <button
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Add Availability"}
        </button>
      </form>
      {/* Existing Availability */}

      <div>
        {Array.isArray(availability) && availability.map((item) => {
          return (
            <div key={item._id} className="border p-4 mb-4">
              <div>
                <p>{days[item.dayOfWeek]}</p>
                <p>
                  {item.startTime}
                  {" - "}
                  {item.endTime}
                  {" | "}
                  {item.slotDuration} minutes
                </p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

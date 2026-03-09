import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use useCallback so the function is stable across renders
  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/experts/me/bookings");
      setSessions(res.data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]); 

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/experts/me/bookings/${id}/status`, { status });
      fetchSessions();
    } catch (err) {
      console.error("Error updating session status:", err);
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Sessions</h1>

      <div className="bg-white p-4 rounded shadow">
        {sessions && sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session._id} className="flex justify-between items-center border p-4 mb-4">
              <div>
        
                <p className="font-bold">{session.user?.name || "Unknown User"}</p>
                <p className="text-sm text-gray-600">
                  {new Date(session.date).toLocaleDateString()} {" | "}
                  {session.timeSlot}
                </p>
                <p>Phone: {session.phone}</p>
                <p className="italic">Status: {session.status}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(session._id, "Confirmed")}
                >
                  Confirm
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(session._id, "Completed")}
                >
                  Complete
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(session._id, "Cancelled")}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No sessions found.</p>
        )}
      </div>
    </div>
  );
}
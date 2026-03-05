import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import Expertcard from "../components/ExpertCard";

export default function ExpertList() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchExperts = useCallback(async () => {
    try {
      setLoading(true);

      const res = await API.get("/experts", {
        params: {
          page,
          search,
          category,
        },
      });

      setExperts(res.data.data);
      setPages(res.data.pagination.pages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load experts");
    } finally {
      setLoading(false);
    }
  }, [page, search, category]);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Expert Sessions</h1>

      {/* Search and filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search experts..."
          className="border p-2 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select 
        className="border p-2 rounded"
        value={category} 
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}
        >
          <option value="">All Categories</option>
          <option value="Career">Career</option>
          <option value="Finance">Finance</option>
          <option value="Fitness">Fitness</option>
        </select>
      </div>

      {/* loading */}
      {loading && <p>Loading experts...</p>}

      {/* error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Expert grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {experts.map((expert) =>(
          <Expertcard key={expert._id} expert={expert} />
        ))}
      </div>
        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
            <button
            disabled={page === 1}
            onClick={() => setPage(page -1)}
            className="px-4 py-2 bg-gray-200 rounded"
            >
                Prev
            </button>
            <span className="px-4 py-2">
                Page {page} / {pages}
            </span>
            <button 
            disabled={page === pages}
            onClick={() => setPage(page +1)}
            className="px-4 py-2 bg-gray-200 rounded"
            >
                Next
            </button>
        </div>
    </div>
  );
}

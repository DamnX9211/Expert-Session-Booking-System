import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";

export default function Register(){

  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "user";


  const [form, setForm] = useState({
    name:"",
    email:"",
    password:""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };

  const handleSubmit = async(e)=>{

    e.preventDefault();

    if(!form.name || !form.email || !form.password){
      return setError("All fields required");
    }

    try{

      setLoading(true);
      setError("");

      const res = await API.post("/auth/register", { ...form, role });

      login(res.data);

      navigate("/");

    }catch(err){

      setError(
        err.response?.data?.message || "Registration failed"
      );

    }finally{
      setLoading(false);
    }

  };


  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-sm">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  );

}
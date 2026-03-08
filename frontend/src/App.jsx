import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertList from "./pages/ExpertList";
import ExpertDetail from "./pages/ExpertDetail";
import BookingForm from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ExpertLayout from "./components/ExpertLayout";
import Dashboard from "./pages/expert/Dashboard";
import Availability from "./pages/expert/Availability";
import Sessions from "./pages/expert/Sessions";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ExpertList />} />
        <Route path="/experts/:id" element={<ExpertDetail />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/expert"
          element={
            <ProtectedRoute>
              <ExpertLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="availability" element={<Availability />} />
          <Route path="sessions" element={<Sessions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

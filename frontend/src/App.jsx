import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertList from "./pages/ExpertList";
import ExpertDetail from "./pages/ExpertDetail";
import BookingForm from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExpertLayout from "./components/ExpertLayout";
import Dashboard from "./pages/expert/Dashboard";
import Availability from "./pages/expert/Availability";
import Sessions from "./pages/expert/Sessions";
import Navbar from "./components/Navbar";
import ExpertRoute from "./components/ExpertRoute";
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingApproval from "./pages/PendingApproval";
import Experts from "./pages/admin/Experts";
import Adminlayout from "./pages/admin/AdminLayout";
import Bookings from "./pages/admin/Bookings";


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
            <UserRoute>
              <MyBookings />
            </UserRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/expert"
          element={
            <ExpertRoute>
              <ExpertLayout />
            </ExpertRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="availability" element={<Availability />} />
          <Route path="sessions" element={<Sessions />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Adminlayout />
            </AdminRoute>
          }
        >
          <Route path="bookings" element={<Bookings />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="experts" element={<Experts />} />
        </Route>
        <Route
          path="/pending-approval"
          element={<PendingApproval />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

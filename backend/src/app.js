const express = require('express');
const cors = require('cors');
const expertRoutes = require('./routes/expert.routes');
const bookingRoutes = require('./routes/booking.routes');
const authRoutes = require('./routes/auth.routes');
const expertDashboardRoutes = require('./routes/expert.dashboard.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/experts", expertRoutes);
app.use("/api/bookings", bookingRoutes)
app.use("/api/experts/me", expertDashboardRoutes);


module.exports = app;
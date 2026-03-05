const express = require('express');
const cors = require('cors');
const expertRoutes = require('./routes/expert.routes');
const bookingRoutes = require('./routes/booking.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
})
app.use("/api/experts", expertRoutes)
app.use("/api/bookings", bookingRoutes)

module.exports = app;
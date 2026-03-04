require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Expert = require("../models/expert.model");

const seed = async () => {
  await connectDB();

  await Expert.create({
    name: "Dr. Sarah Johnson",
    category: "Career",
    experience: 8,
    rating: 4.8,
    bio: "Career mentor helping students with job preparation.",
    availableSlots: [
      {
        date: new Date("2026-03-06"),
        slots: ["10:00", "11:00", "12:00"],
      },
    ],
  });

  console.log("Expert inserted");
  process.exit();
};

seed();
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

app.set("io", io);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinExpertRoom", () => {
        console.log("User joined expert room:", socket.id);
    });
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
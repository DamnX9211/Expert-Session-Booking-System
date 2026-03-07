const { createAdapter } = require("@socket.io/redis-adapter");
const Redis = require("ioredis");
const { Server } = require("socket.io");
require("dotenv").config();

// 1. Create these ONCE at the top level of the file
const pubClient = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null });
const subClient = pubClient.duplicate();

const setupSocket = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });

    // 2. Attach adapter ONCE
    io.adapter(createAdapter(pubClient, subClient));

    io.on("connection", (socket) => {
        // 3. ONLY put logic here, NOT connection setup
        console.log("User connected:", socket.id);
    });
};
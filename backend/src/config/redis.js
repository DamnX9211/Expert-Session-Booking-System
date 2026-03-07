const Redis = require('ioredis');
require("dotenv").config();

const redisUrl = process.env.REDIS_URL;
let redisInstance = null;

function getRedis() {
    if (!redisInstance) {
        console.log("Creating single Redis connection...");
        redisInstance = new Redis(redisUrl, {
            keepAlive: 30000,
            connectTimeout: 10000,
            maxRetriesPerRequest: null,
            enableReadyCheck: true,
        });

        redisInstance.on("connect", () => console.log(" Redis connected"));
        redisInstance.on("error", (err) => console.error(" Redis error:", err.message));
    }
    return redisInstance;
}

module.exports = getRedis;


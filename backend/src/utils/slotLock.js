const redis = require("../config/redis");

const LOCK_TTL = 60;

async function acquireSlotLock(expertId, date, timeSlot) {
    const key = `lock:${expertId}:${date}:${timeSlot}`;

    const result = await redis.set(
        key,
        "locked",
        "NX",
        "EX",
        LOCK_TTL
    
    );
    return result === "OK";

}

async function releaseSlotLock(expertId, date, timeSlot) {
    const key = `lock:${expertId}:${date}:${timeSlot}`;
    await redis.del(key);
}

module.exports = {
    acquireSlotLock,
    releaseSlotLock
}
function generateSlots(startTime, endTime, duration) {
    const slots = [];

    const start = new Date(`2026-01-01T${startTime}:00`);
    const end = new Date(`2026-01-01T${endTime}:00`);

    while(start < end){
        const hours = start.getHours().toString().padStart(2, '0');
        const minutes = start.getMinutes().toString().padStart(2, '0');
        slots.push(`${hours}:${minutes}`);
        start.setMinutes(start.getMinutes() + duration);
    }
    return slots;
}

module.exports = generateSlots;
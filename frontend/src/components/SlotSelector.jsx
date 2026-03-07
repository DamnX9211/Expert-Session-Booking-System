import { useEffect } from "react";
import { useState } from "react";
import API from "../services/api";

export default function SlotSelector({ expertId, date, onSelect }) {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!date) return;
        const fetchSlots = async ()=> {
            try {
                setLoading(true);
                const res = await API.get(`/experts/${expertId}/available-slots`, { params: {date}});

                setSlots(res.data.slots || []);


            } catch (error) {
                console.log(error);
                setSlots([]);
            } finally {
                setLoading(false);
            }
        };
        fetchSlots();
        }, [expertId, date]);

        if(!date){
            return <p className="text-gray-500">Please select a date to see available slots.</p>
        }

        if(loading){
            return <p className="text-gray-500">Loading available slots...</p>
        }

        return (
            <div>
                {slots.length === 0 && (
                    <p className="text-gray-500">No slots available for this date.</p>
                )}
                {slots.length > 0 && (
                    <div className="mt-4">
                        {slots.map((slot) => (
                            <button
                                key={slot.id}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => onSelect(slot)}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        )
 }
        

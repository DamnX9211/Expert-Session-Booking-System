import { Link } from "react-router-dom";

export default function Expertcard({ expert }){
    return (
        <Link to={`/experts/${expert._id}`}>
           <div className="border p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold"   >
                {expert.name}
            </h2>
            <p className="text-sm text-gray-600">
                {expert.category}
            </p>
            <p className="text-sm text-gray-600">
                {expert.experience}
            </p>
            <p className="text-lg font-bold">
              ⭐ {expert.rating}
            </p>
           </div>
        </Link>
    )
}
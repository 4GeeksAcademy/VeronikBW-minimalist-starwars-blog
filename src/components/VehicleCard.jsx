

import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function VehicleCard({ vehicle }) {
    const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/vehicles/${vehicle.uid}.jpg`;
    const { dispatch, store } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.uid === vehicle.uid && fav.type === "vehicle");

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: { ...vehicle, type: "vehicle" } });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: { ...vehicle, type: "vehicle" } });
        }
    };

    return (
        <div className="card bg-dark text-white">
            <img src={imageUrl} className="card-img-top" alt={vehicle?.properties?.name || "Vehicle image"} />
            <div className="card-body text-start">
                <h5 className="card-title mb-3">{vehicle?.properties?.name || "Sin nombre"}</h5>
                <p>Model: {vehicle?.properties?.model}</p>
                <p>Manufacturer: {vehicle?.properties?.manufacturer}</p>
                <div className="d-flex justify-content-between">
                    <Link to={`/vehicle/${vehicle.uid}`} className="btn btn-outline-light">Learn More</Link>
                    <button type="button" className={`btn btn-outline-danger${isFavorite ? ' active' : ''}`} onClick={handleFavorite}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
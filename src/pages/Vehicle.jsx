
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function Vehicle() {
    const { id } = useParams();
    const { store } = useGlobalReducer();
    const vehicle = (store.vehicles || []).find(v => String(v.uid) === String(id));

    const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/vehicles/${id}.jpg`;


    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-md-5 text-center">
                    <img src={imageUrl} alt={vehicle.properties.name} className="img-fluid" />
                </div>
                <div className="col-md-7 text-black">
                    <h2>{vehicle.properties.name}</h2>
                    <p><strong>Model:</strong> {vehicle.properties.model}</p>
                    <p><strong>Manufacturer:</strong> {vehicle.properties.manufacturer}</p>
                    <p><strong>Cost in credits:</strong> {vehicle.properties.cost_in_credits}</p>
                    <p><strong>Passengers:</strong> {vehicle.properties.passengers}</p>
                    <p><strong>Cargo Capacity:</strong> {vehicle.properties.cargo_capacity}</p>
                    <p>{vehicle.description}</p>
                </div>
            </div>
        </div>
    );
}

import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export default function Planet() {
    const { id } = useParams();
    const { store } = useGlobalReducer();
    const planet = (store.planets || []).find(p => String(p.uid) === String(id));

    const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/planets/${id}.jpg`;


    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-md-5 text-center">
                    <img src={imageUrl} alt={planet.properties.name} className="img-fluid rounded" />
                </div>
                <div className="col-md-7 text-black">
                    <h2>{planet.properties.name}</h2>
                    <p><strong>Climate:</strong> {planet.properties.climate}</p>
                    <p><strong>Population:</strong> {planet.properties.population}</p>
                    <p><strong>Terrain:</strong> {planet.properties.terrain}</p>
                    <p><strong>Gravity:</strong> {planet.properties.gravity}</p>
                    <p><strong>Rotation Period:</strong> {planet.properties.rotation_period}</p>
                    <p>{planet.description}</p>
                </div>
            </div>
        </div>
    );
}

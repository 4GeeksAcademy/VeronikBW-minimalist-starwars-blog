import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function PlanetCard({ planet }) {
    const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/planets/${planet.uid}.jpg`;
    const { dispatch, store } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.uid === planet.uid && fav.type === "planet");

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: { ...planet, type: "planet" } });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: { ...planet, type: "planet" } });
        }
    };

    return (
        <div className="card bg-dark text-white">
            <img src={imageUrl} className="card-img-top" alt={planet?.properties?.name || "Planet image"} />
            <div className="card-body text-start">
                <h5 className="card-title mb-3">{planet?.properties?.name || "Sin nombre"}</h5>
                <p>Climate: {planet?.properties?.climate}</p>
                <p>Population: {planet?.properties?.population}</p>
                <p>Terrain: {planet?.properties?.terrain}</p>
                <div className="d-flex justify-content-between">
                    <Link to={`/planet/${planet.uid}`} className="btn btn-outline-light">Learn More</Link>
                    <button type="button" className={`btn btn-outline-danger${isFavorite ? ' active' : ''}`} onClick={handleFavorite}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
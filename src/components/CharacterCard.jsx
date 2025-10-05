

import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function CharacterCard({ character }) {
    const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${character.uid}.jpg`;
    const { dispatch, store } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.uid === character.uid && fav.type === "character");

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: { ...character, type: "character" } });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: { ...character, type: "character" } });
        }
    };

    return (
        <div className="card bg-dark text-white">
            <img src={imageUrl} className="card-img-top" alt={character.properties.name || "Character image"} />
            <div className="card-body text-start">
                <h5 className="card-title mb-3">{character.properties.name}</h5>
                <p>Gender: {character.properties.gender}</p>
                <p>Hair color: {character.properties.hair_color}</p>
                <p>Eye color: {character.properties.eye_color}</p>
                <div className="d-flex justify-content-between">
                    <Link to={`/character/${character.uid}`} className="btn btn-outline-light">Learn More</Link>
                    <button type="button" className={`btn btn-outline-danger${isFavorite ? ' active' : ''}`} onClick={handleFavorite}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
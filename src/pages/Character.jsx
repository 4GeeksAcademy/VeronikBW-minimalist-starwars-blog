import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function Character() {
    const { id } = useParams();
    const { store } = useGlobalReducer();
    const character = (store.characters || []).find(character => String(character.uid) === String(id));


    const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${character.uid}.jpg`;

    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-md-5 text-center">
                    <img src={imageUrl} alt={character.properties.name} className="img-fluid" />
                </div>
                <div className="col-md-7 text-black">
                    <h2>{character.properties.name}</h2>
                    <p><strong>Gender:</strong> {character.properties.gender}</p>
                    <p><strong>Height:</strong> {character.properties.height}</p>
                    <p><strong>Hair color:</strong> {character.properties.hair_color}</p>
                    <p><strong>Eye color:</strong> {character.properties.eye_color}</p>
                    <p><strong>Birth year:</strong> {character.properties.birth_year}</p>
                     <p>{character.description}</p>
                </div>
            </div>
        </div>
    );
}
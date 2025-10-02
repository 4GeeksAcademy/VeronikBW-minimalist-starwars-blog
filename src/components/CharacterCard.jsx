

import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export default function CharacterCard({ character }) {
    return (
        <div className="card">
            <img src={rigoImageUrl} className="card-img-top" alt={character.name || "Character image"} />
            <div className="card-body">
                    <h5 className="card-title">{character.properties.name}</h5>
            </div>
        </div>
    )
}
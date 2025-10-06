import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function Navbar() {
    const { store, dispatch } = useGlobalReducer();
    const favorites = store.favorites || [];

    const handleRemove = (fav, event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch({ type: "REMOVE_FAVORITE", payload: fav });
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Starwars</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Favorites <span className="badge bg-danger ms-1">{favorites.length}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                {favorites.length === 0 ? (
                                    <li><span className="dropdown-item">Empty</span></li>
                                ) : (
                                    favorites.map(fav => {
                                        let displayName = "Favorite";
                                        if (fav.properties.name) displayName = fav.properties.name;
                                        else if (fav.properties.model) displayName = fav.properties.model;
                                        else if (fav.properties.title) displayName = fav.properties.title;
                                        let linkTo = "#";
                                        if (fav.type === "character") linkTo = `/character/${fav.uid}`;
                                        if (fav.type === "planet") linkTo = `/planet/${fav.uid}`;
                                        if (fav.type === "vehicle") linkTo = `/vehicle/${fav.uid}`;
                                        return (
                                            <li key={fav.uid + fav.type} className="d-flex align-items-center justify-content-between">
                                                <Link to={linkTo} className="dropdown-item flex-grow-1">{displayName}</Link>
                                                <button className="btn btn-sm btn-outline-danger ms-2" title="Eliminar" onClick={(e) => handleRemove(fav, e)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
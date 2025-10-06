import PlanetCard from "../components/PlanetCard.jsx";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import CharacterCard from "../components/CharacterCard.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import React from "react";

export const Home = () => {
	const { store } = useGlobalReducer();


	const [planetIndex, setPlanetIndex] = React.useState(0);
	const planetsToShow = 4;
	const planetsArray = store.planets || [];
	const totalPlanets = planetsArray.length;
	const visiblePlanets = planetsArray.slice(planetIndex, planetIndex + planetsToShow);

	const handlePrevPlanet = () => {
		setPlanetIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleNextPlanet = () => {
		setPlanetIndex((prev) =>
			prev + 1 + planetsToShow > totalPlanets
				? prev
				: prev + 1
		);
	};
	
	const [startIndex, setStartIndex] = React.useState(0);
	const cardsToShow = 4;
	const charactersArray = store.characters || [];
	const total = charactersArray.length;
	const visibleCharacters = charactersArray.slice(startIndex, startIndex + cardsToShow);

	const handlePrev = () => {
		setStartIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleNext = () => {
		setStartIndex((prev) =>
			prev + 1 + cardsToShow > total
				? prev
				: prev + 1
		);
	};

	
	const [vehicleIndex, setVehicleIndex] = React.useState(0);
	const vehiclesToShow = 4;
	const vehiclesArray = store.vehicles || [];
	const totalVehicles = vehiclesArray.length;
	const visibleVehicles = vehiclesArray.slice(vehicleIndex, vehicleIndex + vehiclesToShow);

	const handlePrevVehicle = () => {
		setVehicleIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleNextVehicle = () => {
		setVehicleIndex((prev) =>
			prev + 1 + vehiclesToShow > totalVehicles
				? prev
				: prev + 1
		);
	};

	return (
		<>
			<div className="container">
				<h1 className="tittles mt-3">Characters</h1>
				<div className="text-center mt-5">
					<div className="d-flex justify-content-center align-items-center">
						<button className="btn btn-secondary me-2" onClick={handlePrev} disabled={startIndex === 0}>
							&#8592;
						</button>
						<div className="d-flex gap-3">
							{visibleCharacters.map((character, idx) => (
								<CharacterCard key={startIndex + idx} character={character} />
							))}

						</div>
						<button className="btn btn-secondary ms-2" onClick={handleNext} disabled={startIndex + cardsToShow >= total}>
							&#8594;
						</button>
					</div>
				</div>


				<h1 className="tittles mt-5">Planets</h1>
				<div className="text-center mt-5">
					<div className="d-flex justify-content-center align-items-center">
						<button className="btn btn-secondary me-2" onClick={handlePrevPlanet} disabled={planetIndex === 0}>
							&#8592;
						</button>
						<div className="d-flex gap-3">
							{visiblePlanets.map((planet, idx) => (
								<PlanetCard key={planetIndex + idx} planet={planet} />
							))}
						</div>
						<button className="btn btn-secondary ms-2" onClick={handleNextPlanet} disabled={planetIndex + planetsToShow >= totalPlanets}>
							&#8594;
						</button>
					</div>
				</div>


				<h1 className="tittles mt-5">Vehicles</h1>
				<div className="text-center mt-5">
					<div className="d-flex justify-content-center align-items-center">
						<button className="btn btn-secondary me-2" onClick={handlePrevVehicle} disabled={vehicleIndex === 0}>
							&#8592;
						</button>
						<div className="d-flex gap-3">
							{visibleVehicles.map((vehicle, idx) => (
								<VehicleCard key={vehicleIndex + idx} vehicle={vehicle} />
							))}
						</div>
						<button className="btn btn-secondary ms-2" onClick={handleNextVehicle} disabled={vehicleIndex + vehiclesToShow >= totalVehicles}>
							&#8594;
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
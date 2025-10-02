import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import CharacterCard from "../components/CharacterCard.jsx";
import React from "react";

export const Home = () => {

	const { store } = useGlobalReducer();
	const [startIndex, setStartIndex] = React.useState(0);
	const cardsToShow = 4;
	const total = store.characters.length;

	// Calcula los índices de las tarjetas a mostrar
	const visibleCharacters = store.characters.slice(startIndex, startIndex + cardsToShow);

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

	return (
		<div className="text-center mt-5">
			<div className="d-flex justify-content-center align-items-center">
				<button className="btn btn-secondary me-2" onClick={handlePrev} disabled={startIndex === 0}>
					&#8592;
				</button>
				<div className="d-flex" style={{ gap: "1rem" }}>
					{visibleCharacters.map((character, idx) => (
						<CharacterCard key={startIndex + idx} character={character} />
					))}
				</div>
				<button className="btn btn-secondary ms-2" onClick={handleNext} disabled={startIndex + cardsToShow >= total}>
					&#8594;
				</button>
			</div>
		</div>
	);
};
// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()
const URL_BASE = "https://www.swapi.tech/api/"

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    const getPlanets = async () => {
        try {
            let planetsArray = [];
            if (localStorage.getItem("planets") != null) {
                planetsArray = JSON.parse(localStorage.getItem("planets"));
            } else {
                const response = await fetch(`${URL_BASE}planets/`)
                const data = await response.json()
                for (let item of data.results) {
                    const responseDetail = await fetch(item.url)
                    const dataDetail = await responseDetail.json()
                    planetsArray.push(dataDetail.result);
                }
            }
            dispatch({ type: "SET_PLANETS", payload: planetsArray });
        } catch (error) {
            console.log(error)
        }
    }
    const getVehicles = async () => {
        try {
            let vehiclesArray = [];
            if (localStorage.getItem("vehicles") != null) {
                vehiclesArray = JSON.parse(localStorage.getItem("vehicles"));
            } else {
                const response = await fetch(`${URL_BASE}vehicles/`)
                const data = await response.json()
                for (let item of data.results) {
                    const responseDetail = await fetch(item.url)
                    const dataDetail = await responseDetail.json()
                    vehiclesArray.push(dataDetail.result);
                }

            }
            dispatch({ type: "SET_VEHICLES", payload: vehiclesArray });
        } catch (error) {
            console.log(error)
        }
    }
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore())

    const getCharacters = async () => {
        try {
            let charactersArray = [];
            if (localStorage.getItem("characters") != null) {
                charactersArray = JSON.parse(localStorage.getItem("characters"));
            } else {
                const response = await fetch(`${URL_BASE}people/`)
                const data = await response.json()
                for (let item of data.results) {
                    const responseDetail = await fetch(item.url)
                    const dataDetail = await responseDetail.json()
                    charactersArray.push(dataDetail.result);
                }
                localStorage.setItem("characters", JSON.stringify(charactersArray));
            }
            dispatch({ type: "SET_CHARACTERS", payload: charactersArray });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCharacters();
        getVehicles();
        getPlanets();
    }, [])

    // Provide the store and dispatch method to all child components.
    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}
import { createContext, useEffect, useCallback, useReducer } from 'react';

const BASE_URL = 'http://localhost:3001';

const initialValue = { cities: [], isLoading: false };

const CitiesContext = createContext(initialValue);

const initialState = {
    cities: [],
    isLoading: false,
    error: null,
    currentCity: {},
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, isLoading: true };
        case 'CITIES/LOADED':
            return { ...state, isLoading: false, cities: action.payload };
        case 'CITY/CREATED':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case 'CITY/DELETED':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: {},
            };
        case 'CITY/LOADED':
            return { ...state, isLoading: false, currentCity: action.payload };
        case 'REJECTED':
            return { ...state, isLoading: false, error: action.payload };
        default:
            throw new Error('Unknown action type.');
    }
};

const CitiesContextProvider = ({ children }) => {
    // Destructure the state variable
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        const fetchCities = async () => {
            try {
                dispatch({ type: 'LOADING' });

                const response = await fetch(`${BASE_URL}/cities`);

                if (!response.ok) {
                    throw new Error('Error fetching cities data.');
                }

                const data = await response.json();

                dispatch({ type: 'CITIES/LOADED', payload: data });
            } catch (error) {
                // Error is not being used in this application
                // Is better if we include this to follow the pattern in other apps and actually use the error there
                console.error(error.message);
                dispatch({ type: 'REJECTED', payload: error.message });
            }
        };

        fetchCities();
    }, []);

    const getCurrentCity = useCallback(
        async id => {
            if (Number(id) === currentCity.id) {
                return;
            }

            try {
                dispatch({ type: 'LOADING' });

                const response = await fetch(`${BASE_URL}/cities/${id}`);

                if (!response.ok) {
                    throw new Error('Error fetching city data.');
                }

                const data = await response.json();

                dispatch({ type: 'CITY/LOADED', payload: data });
            } catch (error) {
                console.error(error.message);
                dispatch({ type: 'REJECTED', payload: error.message });
            }
        },
        [currentCity.id]
    );

    const createCity = async newCity => {
        try {
            dispatch({ type: 'LOADING' });

            const response = await fetch(`${BASE_URL}/cities/`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error adding the city data.');
            }

            const data = await response.json();

            // Once the backend data is modified we have to synchronize the client data too
            dispatch({ type: 'CITY/CREATED', payload: data });
        } catch (error) {
            console.error(error.message);
            dispatch({ type: 'REJECTED', payload: error.message });
        }
    };

    const deleteCity = async id => {
        try {
            dispatch({ type: 'LOADING' });

            const response = await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting the city data.');
            }

            // Once the backend data is modified we have to synchronize the client data too
            dispatch({ type: 'CITY/DELETED', payload: id });
        } catch (error) {
            console.error(error.message);
        }
    };

    // If we weren't dealing with asynchronous actions, we could've passed the dispatch function
    // to the context value, and use it in the necessary components to dispatch actions
    const contextValue = {
        cities,
        isLoading,
        currentCity,
        getCurrentCity,
        createCity,
        deleteCity,
    };

    return (
        <CitiesContext.Provider value={contextValue}>
            {children}
        </CitiesContext.Provider>
    );
};

export { CitiesContext, CitiesContextProvider };

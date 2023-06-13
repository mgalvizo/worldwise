import { createContext, useState, useEffect, useCallback } from 'react';

const BASE_URL = 'http://localhost:3001';

const initialValue = { cities: [], isLoading: false };

const CitiesContext = createContext(initialValue);

const CitiesContextProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`${BASE_URL}/cities`);

                if (!response.ok) {
                    throw new Error('Error fetching cities data.');
                }

                const data = await response.json();

                setCities(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCities();
    }, []);

    const getCurrentCity = useCallback(async id => {
        try {
            setIsLoading(true);

            const response = await fetch(`${BASE_URL}/cities/${id}`);

            if (!response.ok) {
                throw new Error('Error fetching city data.');
            }

            const data = await response.json();

            setCurrentCity(data);
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createCity = async newCity => {
        try {
            setIsLoading(true);

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
            setCities(prevCities => [...prevCities, data]);
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCity = async id => {
        try {
            setIsLoading(true);

            const response = await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting the city data.');
            }

            // Once the backend data is modified we have to synchronize the client data too
            setCities(prevCities => prevCities.filter(city => city.id !== id));
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

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

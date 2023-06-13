import { useContext } from 'react';
import { CitiesContext } from '../context/citiesContext';

const useCities = () => {
    const citiesContext = useContext(CitiesContext);

    if (citiesContext === undefined) {
        throw new Error(
            'Attempt to access CitiesContext outside the CitiesContextProvider'
        );
    }

    return citiesContext;
};

export { useCities };

import { useSearchParams } from 'react-router-dom';

const useUrlPosition = () => {
    // The current value of the query string and a function to update it
    const [searchParams, setSearchParams] = useSearchParams();
    // The get() method of the URLSearchParams interface returns the first value associated to the given search parameter.
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    // Setter function is NOT used in the app
    return [lat, lng, setSearchParams];
};

export { useUrlPosition };

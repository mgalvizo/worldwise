import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Map.module.css';

const Map = () => {
    // The current value of the query string and a function to update it
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // The get() method of the URLSearchParams interface returns the first value associated to the given search parameter.
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    return (
        <div
            className={styles.mapContainer}
            onClick={() => {
                navigate('form');
            }}
        >
            Position {lat}, {lng}
        </div>
    );
};

export default Map;

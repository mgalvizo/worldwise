import { Link } from 'react-router-dom';
import { useCities } from '../hooks/useCities';
import styles from './CityItem.module.css';

const formatDate = date =>
    new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));

const CityItem = ({ city }) => {
    const { currentCity, deleteCity } = useCities();

    const { id, cityName, emoji, date, position } = city;
    const { lat, lng } = position;

    const handleClick = e => {
        // To avoid the link redirection from happening
        e.preventDefault();
        deleteCity(id);
    };

    return (
        <li>
            {/* Add a query string to the URL after the ? */}
            <Link
                to={`${id}?lat=${lat}&lng=${lng}`}
                className={`${styles.cityItem} ${
                    id === currentCity.id ? styles['cityItem--active'] : ''
                }`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={handleClick}
                >
                    &times;
                </button>
            </Link>
        </li>
    );
};

export default CityItem;

import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';

const formatDate = date =>
    new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));

const CityItem = ({ city }) => {
    const { id, cityName, emoji, date, position } = city;

    const { lat, lng } = position;

    return (
        <li>
            {/* Add a query string to the URL after the ? */}
            <Link
                to={`${id}?lat=${lat}&lng=${lng}`}
                className={styles.cityItem}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button type="button" className={styles.deleteBtn}>
                    &times;
                </button>
            </Link>
        </li>
    );
};

export default CityItem;

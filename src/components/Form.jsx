// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import BackButton from './BackButton';
import { useUrlPosition } from '../hooks/useUrlPosition';
import Message from './Message';
import Spinner from './Spinner';
import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../hooks/useCities';
import { convertToEmoji } from '../utils';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const Form = () => {
    const navigate = useNavigate();
    const { createCity, isLoading } = useCities();
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [geocodingError, setGeocodingError] = useState(null);
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const [emoji, setEmoji] = useState('');

    useEffect(() => {
        if (!lat && !lng) {
            return;
        }

        const fetchCity = async () => {
            try {
                setIsLoadingGeocoding(true);
                setGeocodingError(null);

                const response = await fetch(
                    `${BASE_URL}?latitude=${lat}&longitude=${lng}`
                );

                if (!response.ok) {
                    throw new Error(
                        'Something went wrong when reverse geocoding.'
                    );
                }

                const data = await response.json();

                if (!data.countryCode) {
                    throw new Error(
                        "That doesn't seem to be a city, click somewhere else."
                    );
                }

                setCityName(data.city || data.locality || '');
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (error) {
                console.error(error.message);
                setGeocodingError(error.message);
            } finally {
                setIsLoadingGeocoding(false);
            }
        };

        fetchCity();
    }, [lat, lng]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!cityName || !date) {
            return;
        }

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng },
        };

        // The creation is an async task
        await createCity(newCity);
        navigate('/app');
    };

    return (
        <>
            {!lat && !lng && (
                <Message message="Start by clicking somewhere on the map." />
            )}
            {geocodingError && <Message message={geocodingError} />}
            {isLoadingGeocoding && <Spinner />}
            {!isLoadingGeocoding && !geocodingError && lat && lng && (
                <form
                    className={`${styles.form} ${
                        isLoading ? styles.loading : ''
                    }`}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.row}>
                        <label htmlFor="cityName">City name</label>
                        <input
                            id="cityName"
                            onChange={e => setCityName(e.target.value)}
                            value={cityName}
                        />
                        <span className={styles.flag}>{emoji}</span>
                    </div>

                    <div className={styles.row}>
                        <label htmlFor="date">
                            When did you go to {cityName}?
                        </label>
                        <DatePicker
                            id="date"
                            onChange={date => setDate(date)}
                            selected={date}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className={styles.row}>
                        <label htmlFor="notes">
                            Notes about your trip to {cityName}
                        </label>
                        <textarea
                            id="notes"
                            onChange={e => setNotes(e.target.value)}
                            value={notes}
                        />
                    </div>

                    <div className={styles.buttons}>
                        <Button type="submit" kind="primary">
                            Add
                        </Button>
                        <BackButton />
                    </div>
                </form>
            )}
        </>
    );
};

export default Form;

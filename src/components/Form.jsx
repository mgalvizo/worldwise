// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import styles from './Form.module.css';

export const convertToEmoji = countryCode => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
};

const Form = () => {
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={e => setCityName(e.target.value)}
                    value={cityName}
                />
                {/* <span className={styles.flag}>{emoji}</span> */}
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={e => setDate(e.target.value)}
                    value={date}
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
                <Button type="button" kind="primary">
                    Add
                </Button>
                {/* Programatically navigate backwards to the previous screen before accessing the form */}
                <Button type="button" kind="back" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>
            </div>
        </form>
    );
};

export default Form;

import { v4 as uuidv4 } from 'uuid';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';

const CountryList = ({ cities, isLoading }) => {
    // Alternative to the set approach
    // const countries = cities.reduce((arr, city) => {
    //     if (!arr.map(element => element.country).includes(city.country)) {
    //         return [
    //             ...arr,
    //             { id: uuidv4(), country: city.country, emoji: city.emoji },
    //         ];
    //     } else {
    //         return arr;
    //     }
    // }, []);

    // Unique countries Set in the cities array
    const countriesSet = new Set(
        cities.map(city => {
            const { country, emoji } = city;
            return { id: uuidv4(), country, emoji };
        })
    );

    // Convert Set to array
    const countries = [...countriesSet];

    const renderedCountries = countries.map(country => {
        const { id } = country;
        return <CountryItem key={id} country={country} />;
    });

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && (
                <ul className={styles.countryList}>{renderedCountries}</ul>
            )}
            {!cities.length && (
                <Message message="Add your first city by clicking on a city on the map." />
            )}
        </>
    );
};

export default CountryList;

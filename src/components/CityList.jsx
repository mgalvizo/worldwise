import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import styles from './CityList.module.css';

const CityList = ({ cities, isLoading }) => {
    const renderedCities = cities.map(city => {
        const { id } = city;
        return <CityItem key={id} city={city} />;
    });

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && (
                <ul className={styles.cityList}>{renderedCities}</ul>
            )}
            {!cities.length && (
                <Message message="Add your first city by clicking on a city on the map." />
            )}
        </>
    );
};

export default CityList;

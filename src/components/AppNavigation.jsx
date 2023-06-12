import { NavLink } from 'react-router-dom';
import styles from './AppNavigation.module.css';

const AppNavigation = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    {/* Relative to the app path since this is nested */}
                    <NavLink to="cities">Cities</NavLink>
                </li>
                <li>
                    <NavLink to="countries">Countries</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default AppNavigation;

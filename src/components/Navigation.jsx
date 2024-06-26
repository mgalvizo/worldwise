import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import Logo from './Logo';

const Navigation = () => {
    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={styles.ctaLink}>
                        Login
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;

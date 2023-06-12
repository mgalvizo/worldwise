import { Outlet } from 'react-router-dom';
import AppNavigation from './AppNavigation';
import Logo from './Logo';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNavigation />
            <Outlet />
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} WorldWise Inc.
                </p>
            </footer>
        </div>
    );
};

export default Sidebar;

import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Home = () => {
    return (
        <main className={styles.homepage}>
            <Navigation />
            <section>
                <h1>
                    You travel the world.
                    <br />
                    WorldWise keeps track of your adventures.
                </h1>
                <h2>
                    A world map that tracks your footsteps into every city you
                    can think of. Never forget your wonderful experiences, and
                    show your friends how you have wandered the world.
                </h2>
                <Link className="cta" to="/login">
                    Start tracking now
                </Link>
            </section>
        </main>
    );
};

export default Home;

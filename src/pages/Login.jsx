import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import styles from './Login.module.css';
import Button from '../components/Button';
import { useFakeAuth } from '../hooks/useFakeAuth';

const Login = () => {
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState('jack@example.com');
    const [password, setPassword] = useState('qwerty');
    const { login, isAuthenticated } = useFakeAuth();
    const navigate = useNavigate();

    // Redirect depending on the authentication state
    useEffect(() => {
        if (isAuthenticated) {
            // Makes the browser's back button work properly
            return navigate('/app', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = e => {
        e.preventDefault();

        if (email && password) {
            login(email, password);
        }
    };

    return (
        <main className={styles.login}>
            <Navigation />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type="submit" kind="primary">
                        Login
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default Login;

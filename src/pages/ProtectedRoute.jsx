import { useNavigate } from 'react-router-dom';
import { useFakeAuth } from '../hooks/useFakeAuth';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useFakeAuth();
    const navigate = useNavigate();

    // In an effect fo the redirection of the protected route
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Returning null avoids rendering the app thus if the user object is null the app won't throw errors when trying to access properties of null user object
    return isAuthenticated ? children : null;
};

export default ProtectedRoute;

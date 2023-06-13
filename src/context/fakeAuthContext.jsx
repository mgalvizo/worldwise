import { createContext, useReducer } from 'react';
import { FAKE_USER } from '../utils';

const initialValue = {
    login: () => {},
    logout: () => {},
};

const initialState = {
    user: null,
    isAuthenticated: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false };
        default:
            throw new Error('Unknown action type.');
    }
};

const FakeAuthContext = createContext(initialValue);

const FakeAuthContextProvider = ({ children }) => {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initialState
    );

    // In the real world this functions do an API request
    const login = (email, password) => {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'LOGIN', payload: FAKE_USER });
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const contextValue = {
        user,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <FakeAuthContext.Provider value={contextValue}>
            {children}
        </FakeAuthContext.Provider>
    );
};

export { FakeAuthContext, FakeAuthContextProvider };

import { useContext } from 'react';
import { FakeAuthContext } from '../context/fakeAuthContext';

const useFakeAuth = () => {
    const fakeAuthContext = useContext(FakeAuthContext);

    if (fakeAuthContext === undefined) {
        throw new Error(
            'Attempt to access FakeAuthContext outside the FakeAuthContextProvider'
        );
    }

    return fakeAuthContext;
};

export { useFakeAuth };

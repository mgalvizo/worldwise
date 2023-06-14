// For this project to work make sure to run npm run dev and npm run server, the endpoint is /cities
// The server has an artificial delay of 500ms to fetch data
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// import AppLayout from './pages/AppLayout';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import NotFound from './pages/NotFound';
// import Pricing from './pages/Pricing';
// import Product from './pages/Product';

// Lazy loading pages components
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Product = lazy(() => import('./pages/Product'));

import ProtectedRoute from './pages/ProtectedRoute';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesContextProvider } from './context/citiesContext';
import { FakeAuthContextProvider } from './context/fakeAuthContext';
import SpinnerFullPage from './components/SpinnerFullPage';

const App = () => {
    return (
        <FakeAuthContextProvider>
            <CitiesContextProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="product" element={<Product />} />
                            <Route path="pricing" element={<Pricing />} />
                            <Route path="login" element={<Login />} />
                            {/* Wrap the app with the protected route component */}
                            <Route
                                path="app"
                                element={
                                    <ProtectedRoute>
                                        <AppLayout />
                                    </ProtectedRoute>
                                }
                            >
                                {/* Index route for app, redirects to cities, replace allows to go back with the browser navigation buttons */}
                                <Route
                                    index
                                    element={<Navigate to="cities" replace />}
                                />
                                <Route path="cities" element={<CityList />} />
                                <Route path="cities/:id" element={<City />} />
                                <Route
                                    path="countries"
                                    element={<CountryList />}
                                />
                                <Route path="form" element={<Form />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesContextProvider>
        </FakeAuthContextProvider>
    );
};

export default App;

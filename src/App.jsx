// For this project to work make sure to run npm run dev and npm run server, the endpoint is /cities
// The server has an artificial delay of 500ms to fetch data
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

const BASE_URL = 'http://localhost:3001';

const App = () => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`${BASE_URL}/cities`);

                if (!response.ok) {
                    throw new Error('Error fetching data.');
                }

                const data = await response.json();

                setCities(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCities();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route path="app" element={<AppLayout />}>
                    {/* Index route for app, redirects to cities, replace allows to go back with the browser navigation buttons */}
                    <Route index element={<Navigate to="cities" replace />} />
                    <Route
                        path="cities"
                        element={
                            <CityList cities={cities} isLoading={isLoading} />
                        }
                    />
                    <Route path="cities/:id" element={<City />} />
                    <Route
                        path="countries"
                        element={
                            <CountryList
                                cities={cities}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

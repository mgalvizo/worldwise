// For this project to work make sure to run npm run dev and npm run server, the endpoint is /cities
// The server has an artificial delay of 500ms to fetch data
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { CitiesContextProvider } from './context/citiesContext';

const App = () => {
    return (
        <CitiesContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="login" element={<Login />} />
                    <Route path="app" element={<AppLayout />}>
                        {/* Index route for app, redirects to cities, replace allows to go back with the browser navigation buttons */}
                        <Route
                            index
                            element={<Navigate to="cities" replace />}
                        />
                        <Route path="cities" element={<CityList />} />
                        <Route path="cities/:id" element={<City />} />
                        <Route path="countries" element={<CountryList />} />
                        <Route path="form" element={<Form />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </CitiesContextProvider>
    );
};

export default App;

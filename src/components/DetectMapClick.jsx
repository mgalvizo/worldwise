import { useNavigate } from 'react-router-dom';
import { useMapEvents } from 'react-leaflet';

const DetectMapClick = () => {
    const navigate = useNavigate();

    useMapEvents({
        // We get a custom event from the leaflet library, the latlng object is the position on the map where we clicked
        click: e => {
            const { lat, lng } = e.latlng;
            navigate(`form?lat=${lat}&lng=${lng}`);
        },
    });
    return null;
};

export default DetectMapClick;

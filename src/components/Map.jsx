import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useUrlPosition } from '../hooks/useUrlPosition';
import { useCities } from '../hooks/useCities';
import { useGeolocation } from '../hooks/useGeolocation';
import ChangeMapCenter from './ChangeMapCenter';
import DetectMapClick from './DetectMapClick';
import Button from './Button';
import styles from './Map.module.css';

const Map = () => {
    const { cities } = useCities();
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();
    const [mapPosition, setMapPosition] = useState([0, 0]);

    const [mapLat, mapLng] = useUrlPosition();

    // Will run only if dependices change
    useEffect(() => {
        if (mapLat && mapLng) {
            setMapPosition([mapLat, mapLng]);
        }
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geolocationPosition) {
            const { lat, lng } = geolocationPosition;
            setMapPosition([lat, lng]);
        }
    }, [geolocationPosition]);

    const renderedMarkers = cities.map(city => {
        const {
            id,
            position: { lat, lng },
            emoji,
            cityName,
        } = city;
        return (
            <Marker key={id} position={[lat, lng]}>
                <Popup>
                    <span>{emoji}</span> <span>{cityName}</span>
                </Popup>
            </Marker>
        );
    });

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button type="button" kind="position" onClick={getPosition}>
                    {isLoadingPosition ? 'Loading...' : 'Use your position'}
                </Button>
            )}
            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {renderedMarkers}
                <ChangeMapCenter position={mapPosition} />
                <DetectMapClick />
            </MapContainer>
        </div>
    );
};

export default Map;

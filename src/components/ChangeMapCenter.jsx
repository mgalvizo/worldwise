import { useMap } from 'react-leaflet';

const ChangeMapCenter = ({ position }) => {
    const map = useMap();
    map.setView(position);

    return null;
};

export default ChangeMapCenter;

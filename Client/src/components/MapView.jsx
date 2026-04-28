import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet's default icon URLs
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapView() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        async function fetchLocations() {
            const res = await fetch("http://localhost:5000/locations");
            const data = await res.json();
            setLocations(data);
        }

        fetchLocations();

        const interval = setInterval(fetchLocations, 5000);

        return () => clearInterval(interval);
    }, []);

    // map hook to fit bounds to all markers
    function FitBounds({ locations }) {
    const map = useMap();

    useEffect(() => {
        if (!locations.length) return;

        const bounds = locations.map(loc => [
            loc.latitude,
            loc.longitude
        ]);

        map.fitBounds(bounds);
    }, [locations]);

    return null;
    }   

    return (
        <MapContainer
            center={[32.0853, 34.7818]} zoom={10}
            style={{ height: "500px", width: "100%" }}
        >
            <FitBounds locations={locations} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((loc, i) => (
                <Marker
                    key={i}
                    position={[loc.latitude, loc.longitude]}
                >
                    <Popup>
                        Student ID: {loc.studentId}
                        <br />
                        Time: {loc.time}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
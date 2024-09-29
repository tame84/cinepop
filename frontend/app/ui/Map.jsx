'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const iconUrl = '/images/marker-icon.png';
const iconRetinaUrl = '/images/marker-icon-2x.png';
const shadowUrl = '/images/marker-shadow.png';

const iconDefault = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = iconDefault;

export default function Map({ markers }) {
    const centerLat = markers.reduce((sum, marker) => sum + marker.lat, 0) / markers.length;
    const centerLng = markers.reduce((sum, marker) => sum + marker.lng, 0) / markers.length;

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <MapContainer
                center={[centerLat, centerLng]}
                zoom={13}
                placeholder={<MapPlaceholder />}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markers.map((marker, index) => (
                    <Marker key={`marker-${index}`} position={[marker.lat, marker.lng]}>
                        {marker.title && (
                            <Popup>
                                {marker.title}
                                <br />
                                <a href={marker.googleMapUrl} target="_blank" rel="noopener noreferrer">
                                    Itinéraire Google Maps
                                </a>
                            </Popup>
                        )}
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export function MapPlaceholder() {
    return (
        <p>
            Carte du Brabant Wallon. <noscript>Vous devez activer Javascript pour voir cette carte.</noscript>
        </p>
    );
}

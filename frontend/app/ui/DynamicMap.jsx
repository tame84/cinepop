import dynamic from 'next/dynamic';

export default function DynamicMap() {
    const markers = [
        {
            lat: 50.716783,
            lng: 4.399032,
            title: 'Cinés Wellington',
            googleMapUrl: 'https://maps.app.goo.gl/rrxARx9zvRPqphXe7',
        },
    ];

    const MapWithNoSSR = dynamic(() => import('./Map'), {
        loading: () => <p>Chargement de la carte...</p>,
        ssr: false,
    });

    return (
        <div>
            <MapWithNoSSR markers={markers} />
        </div>
    );
}

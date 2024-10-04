import dynamic from 'next/dynamic';

const markers = [
    {
        title: 'Kinepolis Imagibraine',
        googleMapUrl: 'https://maps.app.goo.gl/b9YRY3YoiD4oRMj39',
        lat: 50.668569,
        lng: 4.378615,
    },
    {
        title: 'Cinés Wellington',
        googleMapUrl: 'https://maps.app.goo.gl/zQXQWBMFrJXVvByh6',
        lat: 50.71679,
        lng: 4.399032,
    },
    {
        title: "Cinéma l'Etoile",
        googleMapUrl: 'https://maps.app.goo.gl/7QRbeRyho7WKyHA2A',
        lat: 50.724877,
        lng: 4.868006,
    },
    {
        title: 'Cinéscope Louvain-la-Neuve',
        googleMapUrl: 'https://maps.app.goo.gl/sSbLM9nDefkwU9qD9',
        lat: 50.669123,
        lng: 4.611538,
    },
    {
        title: 'Ciné Centre',
        googleMapUrl: 'https://maps.app.goo.gl/zuqTopY5DPRmhJRu8',
        lat: 50.711705,
        lng: 4.520992,
    },
    {
        title: 'Ciné4',
        googleMapUrl: 'https://maps.app.goo.gl/UoJfcEJ5UetctxpA7',
        lat: 50.597799,
        lng: 4.321672,
    },
    {
        title: 'CinéGrez',
        googleMapUrl: 'https://maps.app.goo.gl/hUiDsUWdJBfusHvy5',
        lat: 50.73708,
        lng: 4.7023,
    },
];

export default function Map() {
    const MapWithNoSSR = dynamic(() => import('./StaticMap'), {
        loading: () => <p>Chargement de la carte...</p>,
        ssr: false,
    });

    return (
        <div className="map">
            <MapWithNoSSR markers={markers} />
        </div>
    );
}

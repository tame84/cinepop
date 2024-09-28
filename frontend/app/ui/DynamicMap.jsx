import dynamic from 'next/dynamic';
import { markers } from '@/app/lib/markers';

export default function DynamicMap() {
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

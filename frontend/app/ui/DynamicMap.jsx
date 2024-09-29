import dynamic from 'next/dynamic';
import { markers } from '@/app/lib/markers';
import styles from '@/app/ui/styles/map.module.scss';

export default function DynamicMap() {
    const MapWithNoSSR = dynamic(() => import('./Map'), {
        loading: () => <p>Chargement de la carte...</p>,
        ssr: false,
    });

    return (
        <div className={styles.map}>
            <MapWithNoSSR markers={markers} />
        </div>
    );
}

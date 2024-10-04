import Navigation from '@/app/ui/Navigation';
import Map from '@/app/ui/Map';

export default async function Home() {
    return (
        <div className="app">
            <Navigation />
            <Map />
        </div>
    );
}

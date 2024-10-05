import Navigation from '@/app/ui/Navigation';
import Map from '@/app/ui/Map';
import Movies from '@/app/ui/Movies';
import Footer from '@/app/ui/Footer';

export default async function Home({ searchParams }) {
    return (
        <div className="app">
            <Navigation />
            <Map />
            <Movies searchParams={searchParams} />
            <Footer />
        </div>
    );
}

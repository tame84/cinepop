import Header from '@/app/ui/Header';
import Map from '@/app/ui/Map';
import Movies from '@/app/ui/Movies';
import Footer from '@/app/ui/Footer';

export default async function Home({ searchParams }) {
    return (
        <>
            <div className="app">
                <Header />
                <Map />
                <Movies searchParams={searchParams} />
            </div>
            <Footer />
        </>
    );
}

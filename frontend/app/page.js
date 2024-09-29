import Header from '@/app/ui/Header';
import DynamicMap from '@/app/ui/DynamicMap';
import Movies from '@/app/ui/Movies';
import Footer from '@/app/ui/Footer';

export default function Home({ searchParams }) {
    return (
        <>
            <Header />
            <DynamicMap />
            <Movies searchParams={searchParams} />
            <Footer />
        </>
    );
}

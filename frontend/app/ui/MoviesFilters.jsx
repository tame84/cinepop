import WeekDates from '@/app/ui/WeekDates';

export default function MoviesFilters() {
    return (
        <aside>
            <WeekDates />
            <select id="cinemaId" defaultValue="">
                <option value="">Tous les cinémas</option>
                <option value="1">Cinés Wellington</option>
            </select>
        </aside>
    );
}

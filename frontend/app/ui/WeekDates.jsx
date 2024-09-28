export default function WeekDates() {
    const dates = getWeek();

    return (
        <ul>
            {dates.map((date) => (
                <li data-date={date.value} key={date.value}>
                    <p>{date.displayName}</p>
                </li>
            ))}
        </ul>
    );
}

const getWeek = () => {
    const dates = [];

    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dateISO = date.toISOString().split('T')[0];
        const dateLocale = date.toLocaleDateString('fr-FR', {
            month: 'short',
            day: '2-digit',
        });
        dates.push({ value: dateISO, displayName: dateLocale });
        console.log();
    }

    return dates;
};

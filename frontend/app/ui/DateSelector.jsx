import { redirect } from 'next/navigation';

export default function DateSelector() {
    const week = getWeek();

    const handleChangeDate = async (formData) => {
        'use server';
        const date = formData.get('dateValue');
        redirect(`/?date=${date}`);
    };

    return (
        <ul className="dates">
            {week.map((day) => (
                <li key={day.value}>
                    <form action={handleChangeDate}>
                        <input type="hidden" name="dateValue" value={day.value} readOnly />
                        <input type="submit" value={day.displayName} />
                    </form>
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
            day: '2-digit',
            month: 'long',
        });

        dates.push({ value: dateISO, displayName: dateLocale });
    }

    return dates;
};

import { redirect } from 'next/navigation';
import styles from '@/app/ui/styles/modules/date-selector.module.scss';

export default function DateSelector({ selectedDate }) {
    const week = getWeek();

    const handleChangeDate = async (formData) => {
        'use server';
        const date = formData.get('dateValue');
        redirect(`/?date=${date}`);
    };

    return (
        <ul className={styles.dates}>
            {week.map((day) => (
                <li key={day.value} className={`${styles.date} ${selectedDate === day.value ? styles.active : ''}`}>
                    <form action={handleChangeDate}>
                        <input type="hidden" name="dateValue" value={day.value} readOnly />
                        <button type="submit">
                            <p className={styles.text}>
                                <span className={styles.day}>{day.displayName.split(' ')[0]}</span>{' '}
                                <span>{day.displayName.split(' ')[1]}</span>
                            </p>
                        </button>
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

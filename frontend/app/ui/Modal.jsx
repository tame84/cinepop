'use client';

import { useState } from 'react';
import styles from '@/app/ui/styles/modules/modal.module.scss';

export default function Modal({ schedules }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    if (!isOpen) {
        return (
            <button className={styles.button} onClick={openModal}>
                Voir les séances
            </button>
        );
    }

    return (
        <>
            <button className={styles.button} onClick={openModal}>
                Voir les séances
            </button>
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.schedules}>
                        {schedules.map((showtime) => (
                            <CinemaShowtime key={showtime.cinema} showtime={showtime} />
                        ))}
                    </div>
                    <button className={`${styles.button} ${styles.closeButton}`} onClick={closeModal}>
                        Fermer
                    </button>
                </div>
            </div>
        </>
    );
}

const CinemaShowtime = ({ showtime }) => {
    return (
        <>
            <h3>{showtime.cinema}</h3>
            <ul className={styles.hours}>
                {showtime.hours.map((hour) => (
                    <li key={hour.hour}>
                        {hour.hour} <span>{hour.languageVersion}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};

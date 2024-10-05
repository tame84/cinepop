'use client';

import { useState } from 'react';

export default function Modal({ schedules }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    if (!isOpen) {
        return <button onClick={openModal}>Voir les séances disponilbes</button>;
    }

    return (
        <>
            <button onClick={openModal}>Voir les séances disponilbes</button>
            <div className="modal-overlay">
                <div className="modal">
                    {schedules.map((showtime) => (
                        <>
                            <h3>{showtime.cinema}</h3>
                            <ul className="hours">
                                {showtime.hours.map((hour) => (
                                    <li>
                                        {hour.hour} <span>{hour.languageVersion}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ))}
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </>
    );
}

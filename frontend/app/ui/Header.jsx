import styles from '@/app/ui/styles/header.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <div>
                <h1>Cinepop</h1>
                <p>Toute la programmation cinéma du Brabant Wallon en un seul endroit.</p>
            </div>
        </header>
    );
}

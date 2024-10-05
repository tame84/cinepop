import styles from '@/app/ui/styles/modules/header.module.scss';

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <h1>Cinépop</h1>
            <p>Toute la programmation du cinéma du Brabant Wallon en un seul endroit.</p>
            <a href="#movies">Trouver votre prochaine séance</a>
        </nav>
    );
}

import styles from '@/app/ui/styles/modules/footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <p>
                    Sur une idée originale de{' '}
                    <a href="https://www.youtube.com/c/Sol%C3%A8neDRN" target="_blank">
                        Solène DRN
                    </a>
                </p>
                <p>Développé par Dino Valentini</p>
            </div>
            <p className={styles.scrape}>
                Ce projet est uniquement à but éducatif, je m'autorise donc à scraper le site de{' '}
                <a href="https://www.cinenews.be/fr/" target="_blank">
                    Cinenews
                </a>{' '}
                pour l'exercice.
            </p>
        </footer>
    );
}

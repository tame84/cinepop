import styles from '@/app/ui/styles/footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <p>
                    Sur une idée originale et un design de{' '}
                    <a href="https://www.youtube.com/c/Sol%C3%A8neDRN" target="_blank">
                        Solène DRN
                    </a>
                </p>
                <p>Développé par Dino Valentini</p>
                <a className={styles.github} href="https://github.com/tame84/cinepop" target="_blank">
                    Github
                </a>
            </div>
        </footer>
    );
}

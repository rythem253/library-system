import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles["footer"]}>
            <p>&copy; {new Date().getFullYear()} Library Management System</p>
        </footer>
    );
}

export default Footer;
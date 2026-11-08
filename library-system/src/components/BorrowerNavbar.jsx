import styles from './BorrowerNavbar.module.css';

function BorrowerNavbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                {/* Add Logo */}
            </div>

            <ul className={styles['nav-links']}>
                <li className={styles['nav-ind-link']}><a href="#">Home</a></li>
                <li className={styles['nav-ind-link']}><a href="#">Borrow & Search</a></li>
                <li className={styles['nav-ind-link']}><a href="#">Account</a></li>
                <button className={styles['logout-btn']}>Logout</button>
            </ul>
        </nav>
    );
}
export default BorrowerNavbar;
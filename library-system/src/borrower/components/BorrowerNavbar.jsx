import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './BorrowerNavbar.module.css';

function BorrowerNavbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        // clear login state here (e.g. set isLoggedIn to false, remove stored token)
        setMenuOpen(false);
        navigate('/login');
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className={styles['navbar']}>
            <img className={styles['logo']} src="/covers/logo.jpg" alt="logo" />

            <button
                className={styles['menu-btn']}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
            >
                Menu
            </button>

            <ul className={`${styles['nav-links']} ${menuOpen ? styles['open'] : ''}`}>
                <li className={styles['nav-ind-link']}><Link to="/home" onClick={closeMenu}>Home</Link></li>
                <li className={styles['nav-ind-link']}><Link to="/search" onClick={closeMenu}>Borrow & Search</Link></li>
                <li className={styles['nav-ind-link']}><Link to="/account" onClick={closeMenu}>Account</Link></li>
                <button className={styles['logout-btn']} onClick={handleLogout}>Logout</button>
            </ul>
        </nav>
    );
}
export default BorrowerNavbar;
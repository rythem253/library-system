import { Link, useNavigate } from 'react-router-dom';
import styles from './BorrowerNavbar.module.css';

function BorrowerNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // clear login state here (e.g. set isLoggedIn to false, remove stored token)
        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                {/* Add Logo */}
            </div>

            <ul className={styles['nav-links']}>
                <li className={styles['nav-ind-link']}><Link to="/">Home</Link></li>
                <li className={styles['nav-ind-link']}><Link to="/search">Borrow & Search</Link></li>
                <li className={styles['nav-ind-link']}><Link to="/account">Account</Link></li>
                <button className={styles['logout-btn']} onClick={handleLogout}>Logout</button>
            </ul>
        </nav>
    );
}
export default BorrowerNavbar;
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Librarian.module.css';

// Shared layout for every librarian page: navbar + page content + footer
function LibrarianLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  function handleLogout() {
    // No backend yet: just go back to the librarian login page
    navigate('/librarian/login');
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.brand}>Library System</span>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}>
          <NavLink to="/librarian/dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/librarian/inventory" className={linkClass} onClick={() => setMenuOpen(false)}>Inventory</NavLink>
          <NavLink to="/librarian/loans" end className={linkClass} onClick={() => setMenuOpen(false)}>Loans &amp; Returns</NavLink>
          <NavLink to="/librarian/borrowers" className={linkClass} onClick={() => setMenuOpen(false)}>Borrowers</NavLink>
          <NavLink to="/librarian/fines" className={linkClass} onClick={() => setMenuOpen(false)}>Fines</NavLink>
          <NavLink to="/librarian/wishlist" className={linkClass} onClick={() => setMenuOpen(false)}>Wishlist</NavLink>
          <button type="button" className={styles.logout} onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 Library Management System</p>
      </footer>
    </div>
  );
}

export default LibrarianLayout;

import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

// Entry page: choose to sign in as a Borrower or a Librarian
function Welcome() {
  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <div className={styles.logo}>📚</div>
        <h1>Library Management System</h1>
        <p className={styles.subtitle}>Welcome! Please choose how you would like to sign in.</p>

        <div className={styles.choices}>
          <Link to="/login" className={styles.choice}>
            <span className={styles.choiceTitle}>Borrower Login</span>
            <span className={styles.choiceText}>Search, borrow and renew items, and view your account.</span>
          </Link>

          <Link to="/librarian/login" className={styles.choice}>
            <span className={styles.choiceTitle}>Librarian Login</span>
            <span className={styles.choiceText}>Manage inventory, loans, returns, borrowers and fines.</span>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 Library Management System</p>
      </footer>
    </div>
  );
}

export default Welcome;

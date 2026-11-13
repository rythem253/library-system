import { Link } from 'react-router-dom';
import styles from './Librarian.module.css';
import { items, loans, borrowers, getBorrowerName, getItem, isOverdue } from '../data/mockData.js';

function Dashboard() {
  const activeLoans = loans.filter((l) => l.status === 'Active');
  const overdueLoans = activeLoans.filter(isOverdue);

  // Most recent loans first
  const recentLoans = [...loans]
    .sort((a, b) => b.checkoutDate.localeCompare(a.checkoutDate))
    .slice(0, 5);

  return (
    <section>
      <h1 className={styles.pageTitle}>Welcome, Librarian</h1>

      <div className={styles.statGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Items</span>
          <span className={styles.statValue}>{items.length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Active Loans</span>
          <span className={styles.statValue}>{activeLoans.length}</span>
        </div>
        <div className={`${styles.statCard} ${styles.statWarning}`}>
          <span className={styles.statLabel}>Overdue Loans</span>
          <span className={styles.statValue}>{overdueLoans.length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Borrowers</span>
          <span className={styles.statValue}>{borrowers.length}</span>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Quick Access</h2>
      <div className={styles.quickGrid}>
        <Link to="/librarian/items/new" className={styles.quickLink}>Add Item</Link>
        <Link to="/librarian/loans" className={styles.quickLink}>Process Returns</Link>
        <Link to="/librarian/loans/overdue" className={styles.quickLink}>View Overdue</Link>
        <Link to="/librarian/wishlist" className={styles.quickLink}>Wishlist Requests</Link>
      </div>

      <h2 className={styles.sectionTitle}>Recent Loans</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Borrower Name</th>
              <th>Item Title</th>
              <th>Loan Date</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {recentLoans.map((loan) => (
              <tr key={loan.loanId}>
                <td>{loan.loanId}</td>
                <td>{getBorrowerName(loan.borrowerId)}</td>
                <td>{getItem(loan.itemId).title}</td>
                <td>{loan.checkoutDate}</td>
                <td>{loan.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Dashboard;

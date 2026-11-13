import { Link } from 'react-router-dom';
import styles from './Librarian.module.css';
import { loans, getBorrowerName, getItem, isOverdue, daysLate, lateFeeEstimate, TODAY } from '../data/mockData.js';

function OverdueLoans() {
  // Most overdue first
  const overdue = loans.filter(isOverdue).sort((a, b) => daysLate(b) - daysLate(a));

  return (
    <section>
      <Link to="/librarian/loans" className={styles.backLink}>← Back to Loans</Link>
      <h1 className={styles.pageTitle}>Overdue Loans</h1>
      <p className={styles.muted}>As of {TODAY}. Late fee: $0.50 per day, capped at the item price.</p>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Borrower Name</th>
              <th>Item Name</th>
              <th>Due Date</th>
              <th>Days Late</th>
              <th>Late Fee So Far</th>
            </tr>
          </thead>
          <tbody>
            {overdue.map((loan) => (
              <tr key={loan.loanId}>
                <td>{loan.loanId}</td>
                <td>{getBorrowerName(loan.borrowerId)}</td>
                <td>{getItem(loan.itemId).title}</td>
                <td>{loan.dueDate}</td>
                <td>{daysLate(loan)}</td>
                <td>${lateFeeEstimate(loan).toFixed(2)}</td>
              </tr>
            ))}
            {overdue.length === 0 && (
              <tr><td colSpan="6" className={styles.empty}>No overdue loans.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OverdueLoans;

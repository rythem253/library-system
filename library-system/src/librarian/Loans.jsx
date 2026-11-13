import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Librarian.module.css';
import StatusBadge from './StatusBadge.jsx';
import {
  loans as mockLoans, getBorrowerName, getItem, isOverdue, daysLate, lateFeeEstimate, TODAY,
} from '../data/mockData.js';

const DAMAGE_FEE = 10;

function Loans() {
  const [loanList, setLoanList] = useState(mockLoans);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [returning, setReturning] = useState(null); // loan being processed
  const [damaged, setDamaged] = useState(false);
  const [message, setMessage] = useState('');

  const text = search.trim().toLowerCase();
  const shownLoans = loanList.filter((loan) => {
    const matchesText = getBorrowerName(loan.borrowerId).toLowerCase().includes(text);
    const matchesStatus = statusFilter === 'All' || loan.status === statusFilter;
    return matchesText && matchesStatus;
  });

  function startReturn(loan) {
    setReturning(loan);
    setDamaged(false);
    setMessage('');
  }

  // Estimate: late fee ($0.50/day, capped at price) + item price and $10 if damaged
  function totalEstimate() {
    if (!returning) return 0;
    const item = getItem(returning.itemId);
    let total = lateFeeEstimate(returning);
    if (damaged) total += item.price + DAMAGE_FEE;
    return total;
  }

  function confirmReturn() {
    setLoanList(loanList.map((loan) =>
      loan.loanId === returning.loanId
        ? { ...loan, status: 'Returned', returnDate: TODAY }
        : loan
    ));
    setMessage(`Return processed for ${returning.loanId}. Fees charged: $${totalEstimate().toFixed(2)}.`);
    setReturning(null);
  }

  return (
    <section>
      <h1 className={styles.pageTitle}>Loans &amp; Returns</h1>

      <div className={styles.toolbar}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search by borrower"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="Active">Active Loans</option>
          <option value="Returned">Returned</option>
          <option value="Lost">Lost</option>
          <option value="All">All Loans</option>
        </select>
        <Link to="/librarian/loans/overdue" className={styles.btnSmall}>Overdue Loans</Link>
      </div>

      {message && <p className={styles.success}>{message}</p>}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Borrower Name</th>
              <th>Item Name</th>
              <th>Loan Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shownLoans.map((loan) => (
              <tr key={loan.loanId}>
                <td>{loan.loanId}</td>
                <td>{getBorrowerName(loan.borrowerId)}</td>
                <td>{getItem(loan.itemId).title}</td>
                <td>{loan.checkoutDate}</td>
                <td>{loan.dueDate}</td>
                <td><StatusBadge status={isOverdue(loan) ? 'Overdue' : loan.status} /></td>
                <td>
                  {loan.status === 'Active' && (
                    <button type="button" className={styles.btnSmall} onClick={() => startReturn(loan)}>Process Return</button>
                  )}
                </td>
              </tr>
            ))}
            {shownLoans.length === 0 && (
              <tr><td colSpan="7" className={styles.empty}>No loans found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Process Return panel with a live fee estimate */}
      {returning && (
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Process Return: {returning.loanId}</h2>
          <p><strong>Item:</strong> {getItem(returning.itemId).title}</p>
          <p><strong>Borrower:</strong> {getBorrowerName(returning.borrowerId)}</p>
          <p><strong>Days late:</strong> {daysLate(returning)}</p>
          <p><strong>Late fee:</strong> ${lateFeeEstimate(returning).toFixed(2)}</p>

          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={damaged} onChange={(e) => setDamaged(e.target.checked)} />
            Item returned damaged (item price + ${DAMAGE_FEE} fee)
          </label>

          <p className={styles.estimate}>Estimated total fees: ${totalEstimate().toFixed(2)}</p>

          <div className={styles.formButtons}>
            <button type="button" className={styles.btnPrimary} onClick={confirmReturn}>Confirm Return</button>
            <button type="button" className={styles.btnSmall} onClick={() => setReturning(null)}>Cancel</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Loans;

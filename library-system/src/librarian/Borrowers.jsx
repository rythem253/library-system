import { useState } from 'react';
import styles from './Librarian.module.css';
import StatusBadge from './StatusBadge.jsx';
import { borrowers as mockBorrowers, loans, getItem } from '../data/mockData.js';

function Borrowers() {
  const [borrowerList, setBorrowerList] = useState(mockBorrowers);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState('');

  const text = search.trim().toLowerCase();
  const shown = borrowerList.filter((b) =>
    `${b.firstName} ${b.lastName}`.toLowerCase().includes(text) || b.cardNumber.includes(text)
  );

  const selected = borrowerList.find((b) => b.borrowerId === selectedId);
  const selectedLoans = loans.filter((l) => l.borrowerId === selectedId && l.status === 'Active');

  function toggleBan(borrower) {
    // Business rule: a ban can only be lifted once all fines are paid
    if (borrower.isBanned && borrower.fineBalance > 0) {
      setMessage(`${borrower.firstName} has $${borrower.fineBalance.toFixed(2)} in unpaid fines. Fines must be paid before lifting the ban.`);
      return;
    }
    setBorrowerList(borrowerList.map((b) =>
      b.borrowerId === borrower.borrowerId ? { ...b, isBanned: !b.isBanned } : b
    ));
    setMessage(`${borrower.firstName} ${borrower.lastName} was ${borrower.isBanned ? 'unbanned' : 'banned'}.`);
  }

  return (
    <section>
      <h1 className={styles.pageTitle}>Borrowers</h1>

      <div className={styles.toolbar}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search by name or card number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {message && <p className={styles.info}>{message}</p>}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((b) => (
              <tr key={b.borrowerId}>
                <td>{b.cardNumber}</td>
                <td>{b.firstName} {b.lastName}</td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td><StatusBadge status={b.isBanned ? 'Banned' : 'Active'} /></td>
                <td className={styles.actions}>
                  <button type="button" className={styles.btnSmall} onClick={() => setSelectedId(b.borrowerId)}>View</button>
                  <button type="button" className={b.isBanned ? styles.btnSmall : styles.btnDanger} onClick={() => toggleBan(b)}>
                    {b.isBanned ? 'Lift Ban' : 'Ban'}
                  </button>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr><td colSpan="6" className={styles.empty}>No borrowers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details for the selected borrower */}
      {selected && (
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>{selected.firstName} {selected.lastName}</h2>
          <div className={styles.detailGrid}>
            <p><strong>Card:</strong> {selected.cardNumber}</p>
            <p><strong>Fine balance:</strong> ${selected.fineBalance.toFixed(2)}</p>
            <p><strong>Violations:</strong> {selected.violationCount} / 5</p>
            <p><strong>Blocked until:</strong> {selected.blockedUntil || 'Not blocked'}</p>
          </div>
          <h3>Current Loans</h3>
          {selectedLoans.length === 0 ? (
            <p className={styles.muted}>No current loans.</p>
          ) : (
            <ul>
              {selectedLoans.map((l) => (
                <li key={l.loanId}>{getItem(l.itemId).title} (due {l.dueDate})</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export default Borrowers;

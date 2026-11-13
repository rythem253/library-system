import { useState } from 'react';
import styles from './Librarian.module.css';
import StatusBadge from './StatusBadge.jsx';
import { fines as mockFines, borrowers, getBorrowerName } from '../data/mockData.js';

function Fines() {
  const [fineList, setFineList] = useState(mockFines);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [newFine, setNewFine] = useState({ borrowerId: 'B001', amount: '', reason: '' });
  const [error, setError] = useState('');

  const text = search.trim().toLowerCase();
  const shown = fineList.filter((f) => {
    const matchesText = getBorrowerName(f.borrowerId).toLowerCase().includes(text);
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchesText && matchesStatus;
  });

  const unpaidTotal = shown
    .filter((f) => f.status === 'Unpaid')
    .reduce((sum, f) => sum + f.amount, 0);

  function updateStatus(fineId, status) {
    setFineList(fineList.map((f) => (f.fineId === fineId ? { ...f, status } : f)));
  }

  function handleAddFine(event) {
    event.preventDefault();
    const amount = Number(newFine.amount);
    if (newFine.amount === '' || amount <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }
    if (newFine.reason.trim() === '') {
      setError('Please enter a reason.');
      return;
    }
    const fine = {
      fineId: 'F' + (500 + fineList.length),
      borrowerId: newFine.borrowerId,
      amount,
      reason: newFine.reason.trim(),
      status: 'Unpaid',
    };
    setFineList([fine, ...fineList]);
    setNewFine({ borrowerId: 'B001', amount: '', reason: '' });
    setError('');
  }

  return (
    <section>
      <h1 className={styles.pageTitle}>Fine Management</h1>

      <div className={styles.toolbar}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search by borrower"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
          <option value="Waived">Waived</option>
        </select>
      </div>

      <p className={styles.estimate}>Unpaid total (shown): ${unpaidTotal.toFixed(2)}</p>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fine ID</th>
              <th>Borrower Name</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((f) => (
              <tr key={f.fineId}>
                <td>{f.fineId}</td>
                <td>{getBorrowerName(f.borrowerId)}</td>
                <td>${f.amount.toFixed(2)}</td>
                <td>{f.reason}</td>
                <td><StatusBadge status={f.status} /></td>
                <td className={styles.actions}>
                  {f.status === 'Unpaid' && (
                    <>
                      <button type="button" className={styles.btnSmall} onClick={() => updateStatus(f.fineId, 'Paid')}>Mark Paid</button>
                      <button type="button" className={styles.btnSmall} onClick={() => updateStatus(f.fineId, 'Waived')}>Waive</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr><td colSpan="6" className={styles.empty}>No fines found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add a fine */}
      <form className={styles.card} onSubmit={handleAddFine} noValidate>
        <h2 className={styles.sectionTitle}>Add a Fine</h2>
        <div className={styles.formGrid}>
          <label htmlFor="fineBorrower">Borrower</label>
          <select id="fineBorrower" value={newFine.borrowerId} onChange={(e) => setNewFine({ ...newFine, borrowerId: e.target.value })}>
            {borrowers.map((b) => (
              <option key={b.borrowerId} value={b.borrowerId}>{b.firstName} {b.lastName} ({b.cardNumber})</option>
            ))}
          </select>

          <label htmlFor="fineAmount">Amount ($)</label>
          <input id="fineAmount" type="number" min="0" step="0.01" value={newFine.amount} onChange={(e) => setNewFine({ ...newFine, amount: e.target.value })} />

          <label htmlFor="fineReason">Reason</label>
          <input id="fineReason" type="text" value={newFine.reason} onChange={(e) => setNewFine({ ...newFine, reason: e.target.value })} />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.formButtons}>
          <button type="submit" className={styles.btnPrimary}>Add Fine</button>
        </div>
      </form>
    </section>
  );
}

export default Fines;

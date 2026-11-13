import { useState } from 'react';
import styles from './Librarian.module.css';
import StatusBadge from './StatusBadge.jsx';
import { wishlist as mockWishlist, getBorrowerName } from '../data/mockData.js';

function Wishlist() {
  const [requests, setRequests] = useState(mockWishlist);
  const [statusFilter, setStatusFilter] = useState('All');

  const shown = requests.filter((r) => statusFilter === 'All' || r.status === statusFilter);

  function updateStatus(wishlistId, status) {
    setRequests(requests.map((r) => (r.wishlistId === wishlistId ? { ...r, status } : r)));
  }

  function removeRequest(wishlistId) {
    setRequests(requests.filter((r) => r.wishlistId !== wishlistId));
  }

  return (
    <section>
      <h1 className={styles.pageTitle}>Wishlist Requests</h1>

      <div className={styles.toolbar}>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
        </select>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Borrower</th>
              <th>Title</th>
              <th>Author</th>
              <th>Requested</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.wishlistId}>
                <td>{r.wishlistId}</td>
                <td>{getBorrowerName(r.borrowerId)}</td>
                <td>{r.title}</td>
                <td>{r.author}</td>
                <td>{r.requestDate}</td>
                <td><StatusBadge status={r.status} /></td>
                <td className={styles.actions}>
                  <select value={r.status} onChange={(e) => updateStatus(r.wishlistId, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Denied">Denied</option>
                  </select>
                  <button type="button" className={styles.btnDanger} onClick={() => removeRequest(r.wishlistId)}>Remove</button>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr><td colSpan="7" className={styles.empty}>No requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Wishlist;

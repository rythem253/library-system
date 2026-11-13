import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Librarian.module.css';
import StatusBadge from './StatusBadge.jsx';
import { items as mockItems, itemTypes, itemStatuses, getTypeName } from '../data/mockData.js';

function Inventory() {
  const [itemList, setItemList] = useState(mockItems);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [message, setMessage] = useState('');

  // Filter by search text (title, author, ISBN), type and status
  const text = search.trim().toLowerCase();
  const shownItems = itemList.filter((item) => {
    const matchesText =
      item.title.toLowerCase().includes(text) ||
      item.author.toLowerCase().includes(text) ||
      item.isbn.includes(text);
    const matchesType = typeFilter === 'All' || item.itemTypeId === typeFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesText && matchesType && matchesStatus;
  });

  function handleRemove(item) {
    // Business rule: cannot remove an item that is checked out
    if (item.status === 'CheckedOut') {
      setMessage(`"${item.title}" is checked out and cannot be removed.`);
      return;
    }
    setItemList(itemList.filter((x) => x.itemId !== item.itemId));
    setMessage(`"${item.title}" was removed from the inventory.`);
  }

  return (
    <section>
      <div className={styles.titleRow}>
        <h1 className={styles.pageTitle}>Inventory</h1>
        <Link to="/librarian/items/new" className={styles.btnPrimary}>Add Item</Link>
      </div>

      <div className={styles.toolbar}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search by title, author or ISBN"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="All">All Categories</option>
          {itemTypes.map((t) => (
            <option key={t.itemTypeId} value={t.itemTypeId}>{t.typeName}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          {itemStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {message && <p className={styles.info}>{message}</p>}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shownItems.map((item) => (
              <tr key={item.itemId}>
                <td>{item.itemId}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{getTypeName(item.itemTypeId)}</td>
                <td><StatusBadge status={item.status} /></td>
                <td className={styles.actions}>
                  <Link to={`/librarian/items/${item.itemId}/edit`} className={styles.btnSmall}>Edit</Link>
                  <button type="button" className={styles.btnDanger} onClick={() => handleRemove(item)}>Remove</button>
                </td>
              </tr>
            ))}
            {shownItems.length === 0 && (
              <tr><td colSpan="6" className={styles.empty}>No items match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Inventory;

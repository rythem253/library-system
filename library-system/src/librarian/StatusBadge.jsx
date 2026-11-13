import styles from './Librarian.module.css';

// Coloured label for any status (Available, Overdue, Unpaid, etc.)
function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${styles['badge' + status] || ''}`}>
      {status}
    </span>
  );
}

export default StatusBadge;

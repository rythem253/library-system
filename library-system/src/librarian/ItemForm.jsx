import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Librarian.module.css';
import { items, itemTypes, itemStatuses } from '../data/mockData.js';

// Used for two pages: Add Item (/librarian/items/new)
// and Edit Item (/librarian/items/:itemId/edit)
function ItemForm() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const existing = items.find((x) => x.itemId === itemId);
  const isEdit = Boolean(itemId);

  const [form, setForm] = useState({
    title: existing ? existing.title : '',
    author: existing ? existing.author : '',
    isbn: existing ? existing.isbn : '',
    itemTypeId: existing ? existing.itemTypeId : 'T-BOOK',
    status: existing ? existing.status : 'Available',
    price: existing ? String(existing.price) : '',
    description: existing ? existing.description : '',
  });
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setError('');
    setSaved('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (form.title.trim() === '') {
      setError('Title is required.');
      return;
    }
    const price = Number(form.price);
    if (form.price === '' || price <= 0) {
      setError('Price must be a number greater than 0.');
      return;
    }

    // Prototype only: nothing is saved yet (backend comes in Milestone 4)
    setSaved(isEdit ? `"${form.title}" was updated.` : `"${form.title}" was added to the inventory.`);
  }

  if (isEdit && !existing) {
    return (
      <section>
        <h1 className={styles.pageTitle}>Item not found</h1>
        <button type="button" className={styles.btnSmall} onClick={() => navigate('/librarian/inventory')}>Back to Inventory</button>
      </section>
    );
  }

  return (
    <section>
      <button type="button" className={styles.backLink} onClick={() => navigate('/librarian/inventory')}>← Back</button>
      <h1 className={styles.pageTitle}>{isEdit ? `Edit Item (${itemId})` : 'Add New Item'}</h1>

      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <div className={styles.formGrid}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" value={form.title} onChange={handleChange} />

          <label htmlFor="author">Author</label>
          <input id="author" name="author" value={form.author} onChange={handleChange} />

          <label htmlFor="isbn">ISBN</label>
          <input id="isbn" name="isbn" value={form.isbn} onChange={handleChange} />

          <label htmlFor="itemTypeId">Category</label>
          <select id="itemTypeId" name="itemTypeId" value={form.itemTypeId} onChange={handleChange}>
            {itemTypes.map((t) => (
              <option key={t.itemTypeId} value={t.itemTypeId}>{t.typeName} ({t.loanDays}-day loan)</option>
            ))}
          </select>

          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            {itemStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <label htmlFor="price">Price ($)</label>
          <input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} />

          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="4" value={form.description} onChange={handleChange} />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {saved && <p className={styles.success}>{saved}</p>}

        <div className={styles.formButtons}>
          <button type="submit" className={styles.btnPrimary}>SAVE</button>
        </div>
      </form>
    </section>
  );
}

export default ItemForm;

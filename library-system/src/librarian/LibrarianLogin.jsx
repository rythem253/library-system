import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Librarian.module.css';

function LibrarianLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (username.trim() === '' || password === '') {
      setError('Please enter your username and password.');
      return;
    }

    // Prototype only: any username/password is accepted (no backend yet)
    navigate('/librarian/dashboard');
  }

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginCard} onSubmit={handleSubmit} noValidate>
        <h1>Library System</h1>
        <p className={styles.muted}>Librarian Login</p>

        <label htmlFor="libUsername">Username</label>
        <input
          id="libUsername"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => { setUsername(e.target.value); setError(''); }}
        />

        <label htmlFor="libPassword">Password</label>
        <input
          id="libPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.btnPrimary}>LOGIN</button>
        <p className={styles.hint}>Demo: any username and password will work.</p>
      </form>
    </div>
  );
}

export default LibrarianLogin;

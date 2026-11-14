import styles from './BorrowerLogin.module.css';
import { useNavigate } from 'react-router-dom';
import LoginButton from './components/LoginButton.jsx';

function BorrowerLogin() {

  const navigate = useNavigate();

  const handleLogin = () => {
        navigate('/');
    };

  return (
    <div className={styles.layout}>
      <h1>Login</h1>

      <div className={styles['form-login']}>
        <label className={styles['label-field']}>Username:</label>
        <input className={styles['text-field']} type="text" placeholder="username" />
      </div>

      <div className={styles['form-login']}>
        <label className={styles['label-field']}>Card Number: </label>
        <input className={styles['text-field']} type="text" placeholder="card number" />
      </div>

      <div className={styles['form-login-button']}>
        <LoginButton onClick={handleLogin} />
      </div>

    </div>
  );
}

export default BorrowerLogin;
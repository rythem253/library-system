import styles from './BorrowerLogin.module.css';
import { useNavigate } from 'react-router-dom';
import LoginButton from './components/LoginButton.jsx';
import { useState } from 'react';

function BorrowerLogin() {

  const [cardNumber, setCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    //Sent POST /api/login with JSON data
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: cardNumber,
        password: password,
      })
    });

    const data = await response.json();

    //Response OK then login then navigate to home screen
    //Otherwise fail message
    if (response.ok) {
      navigate("/home");
    } else {
      setMessage(data.message);
    }
  }


return (
  <div className={styles.layout}>
    <img className={styles.logo} src="/covers/logo.jpg" alt="Library logo" />
    <h1 className={styles.title}>Login</h1>


    <div className={styles['form-login']}>
      <label className={styles['label-field']}>Card Number:</label>
      <input className={styles['text-field']} 
      value={cardNumber}
      type="text" 
      placeholder="card number" 
      onChange={(e) => setCardNumber(e.target.value)}
      />
    </div>

    <div className={styles['form-login']}>
      <label className={styles['label-field']}>Password</label>
      <input className={styles['text-field']} 
      value={password}
      type="text" 
      placeholder="password" 
      onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div className={styles['form-login-button']}>
      <LoginButton onClick={handleLogin} />
    </div>

  </div>
);
}


export default BorrowerLogin;
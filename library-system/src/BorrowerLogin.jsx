import './BorrowerLogin.module.css';
import { useNavigate } from 'react-router-dom';
import LoginButton from './components/LoginButton.jsx';

function BorrowerLogin() {

  const navigate = useNavigate();

  const handleLogin = () => {
        // clear login state here (e.g. set isLoggedIn to false, remove stored token)
        navigate('/');
    };

  return (
    <div className="layout">
      <h1>Login</h1>

      <div className="form-login">
        <label className="label-field">Username:</label>
        <input className="text-field" type="text" placeholder="username" />
      </div>

      <div className="form-login">
        <label className="label-field">Card Number: </label>
        <input className="text-field" type="text" placeholder="card number" />
      </div>

      <div className="form-login">
        <LoginButton onClick={handleLogin} />
      </div>

    </div>
  );
}

export default BorrowerLogin;
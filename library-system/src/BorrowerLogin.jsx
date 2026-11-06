import "./BorrowerLogin.css";
import LoginButton from "./components/LoginButton.jsx";

function BorrowerLogin() {
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
        <LoginButton />
      </div>

    </div>


  );
}

export default BorrowerLogin;
import styles from './LoginButton.module.css';

function LoginButton({ onClick }) {
    return (
        <button className={styles['login-btn']} onClick={onClick}>
            Login
        </button>
    );
}

export default LoginButton;
import styles from './SelectButton.module.css';

function SelectButton({ onClick }) {
    return (
        <button className={styles['select-button']} onClick={onClick}>
            Select
        </button>
    );
}

export default SelectButton;
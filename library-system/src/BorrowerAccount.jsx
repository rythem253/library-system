import BorrowerNavbar from "./components/BorrowerNavbar.jsx";
import { useLocation } from "react-router-dom";
import styles from "./BorrowerAccount.module.css";
import Footer from "./components/Footer.jsx";

// Placeholder data until the backend is connected
const user = {
    name: "Micheal",
    email: "micheal_smith@mail.com",
    phone: "111-111-1111",
};

const fines = [];
const wishlist = [];

function BorrowerAccount() {

    const { state } = useLocation();
    const item = state?.item;

    return (
        <div>
            <div>
                <BorrowerNavbar />
            </div>

            <section className={styles['user-info']}>
                <h1 className={styles['text-design']}> Borrower Information</h1>
                <label className={styles['text-design']}>Name: {user.name}</label>
                <label className={styles['text-design']}>Email: {user.email}</label>
                <label className={styles['text-design']}>Phone: {user.phone}</label>
            </section>

            <section className={styles['user-info']}>
                <h1 className={styles['text-design']}>Checked Out</h1>
                {item ? (
                    <div className={styles['flex-direction']}>
                        <label className={styles['text-design']}>{item.Title}</label>
                        <div>
                            <button className={styles['button']}>Renew</button>
                            <button className={styles['button']}>Return</button>
                        </div>
                    </div>
                ) : (
                    <label className={styles['text-design']}>None</label>
                )}
            </section>

            <section className={styles['user-info']}>
                <h1 className={styles['text-design']}>Fines</h1>
                <label className={styles['text-design']}>None</label>
            </section>

            <section className={styles['user-info']}>
                <h1 className={styles['text-design']}>Wishlist</h1>
                <label className={styles['text-design']}>None</label>
            </section>
            <Footer />
        </div>
    );
}



export default BorrowerAccount;
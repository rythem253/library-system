import { useLocation, useNavigate } from "react-router-dom";
import BorrowerNavbar from "./components/BorrowerNavbar.jsx";
import styles from "./Checkout.module.css";
import Footer from "./components/Footer.jsx";

function getCover(item) {
    if (String(item.cover_id).startsWith('/')) {
        return item.cover_id;
    } else {
        return `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`;
    }
}

function Checkout() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const item = state?.item;

    const handleCancel = () => {
        navigate('/search');
    };

    const handleCheckout = () => {
        navigate('/account', { state: { item } });
    };

    if (!item) {
        return (
            <div>
                <BorrowerNavbar />
                <p>No item selected.</p>
                <Footer />
            </div>
        );
    }

    const today = new Date();
    const dueDate = new Date(today.getTime() + item.LoanPeriodDays * 24 * 60 * 60 * 1000);

    return (
        <div className={styles["page"]}>
            <BorrowerNavbar />
            <div className={styles["content"]}>
                <div className={styles["details"]}>
                    <img
                        className={styles['cover']}
                        src={getCover(item)}
                        alt={item.Title}
                    />
                    <section className={styles["item-details"]}>
                        <p>{item.Title}</p>
                        <p>{item.Author}</p>
                        <p>Loan Period: {item.LoanPeriodDays} Days</p>
                        <p>Borrowed: {today.toLocaleDateString()}</p>
                        <p>Due: {dueDate.toLocaleDateString()}</p>
                    </section>
                    <button className={styles["button"]} onClick={handleCheckout}>Checkout</button>
                    <button className={styles["button-cancel"]} onClick={handleCancel}>Cancel</button>
                    <div className={styles["late-fee"]}>Late returns are subject to a fee</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Checkout;
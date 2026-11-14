import { useLocation, useNavigate } from "react-router-dom";
import BorrowerNavbar from "./components/BorrowerNavbar.jsx";
import styles from "./Checkout.module.css";
import Footer from "./components/Footer.jsx";

function Checkout() {

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/search');
    }
    const { state } = useLocation();
    const item = state?.item;
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); return (

        <div className={styles["page"]}>
            <BorrowerNavbar />
            <div className={styles["content"]}>
                <div className={styles["details"]}>
                    <div className={styles["cover"]} >
                        {item.cover_id && (
                            <img
                                src={`https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`}
                                alt={item.Title}
                            />
                        )}
                    </div>
                    <section className={styles["item-details"]}>
                        <p>{item.Title}</p>
                        <p>{item.Author}</p>
                        <p>Borrowed: {today.toLocaleDateString()}</p>
                        <p>Due: {nextWeek.toLocaleDateString()}</p>
                    </section>
                    <button className={styles["button"]}>Checkout</button>
                    <button className={styles["button-cancel"]} onClick={handleCancel}>Cancel</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Checkout;
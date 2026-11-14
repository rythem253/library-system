import { useLocation, useNavigate } from "react-router-dom";
import BorrowerNavbar from "./components/BorrowerNavbar.jsx";
import styles from "./ItemDetails.module.css";
import Footer from "./components/Footer.jsx";

function ItemDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const item = state?.item;

    function handleCheckout() {
        navigate("/checkout", { state: { item } });
    }

    if (!item) {
        return (
            <div>
                <BorrowerNavbar />
                <p>No item selected.</p>
                <button onClick={() => navigate("/search")}>Back to search</button>
            </div>
        );
    }

    return (
        <div>
            <BorrowerNavbar />
            <h1 className={styles["page-title"]}>Item Details</h1>

            <div className={styles["details"]}>
                <div className={styles["cover"]}>
                    {item.Cover ? (
                        <img src={item.Cover} alt={item.Title} />
                    ) : (
                        <p>No cover</p>
                    )}
                </div>

                <div className={styles["right"]}>
                    <div className={styles["info-box"]}>
                        <p>Book Title: {item.Title}</p>
                        <p>Author: {item.Author}</p>
                        <p>Publisher: {item.Publisher}</p>
                        <p>Genre: {item.Genre}</p>
                        <p>
                            Availability: {item.AvailableCopies}/{item.TotalCopies} Copies Available
                        </p>
                        <p className={styles["description"]}>
                            Description: {item.Description}
                        </p>
                    </div>
                    <button className={styles["checkout-btn"]} onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ItemDetails;
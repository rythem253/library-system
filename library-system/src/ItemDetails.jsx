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
        <div className={styles["page"]}>
            <BorrowerNavbar />

            <div className={styles["content"]}>
                <h1 className={styles["page-title"]}>Item Details</h1>

                <div className={styles["details"]}>
                    <div className={styles["cover"]}>
                           {item.cover_id && (
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`}
                                    alt={item.Title}
                                />
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
            </div>
            <Footer />
        </div>
    );
}

export default ItemDetails;
import { useLocation, useNavigate } from "react-router-dom";
import BorrowerNavbar from "./components/BorrowerNavbar.jsx";
import styles from "./ItemDetails.module.css";
import Footer from "./components/Footer.jsx";

function getCover(item) {
    if (String(item.cover_id).startsWith('/')) {
        return item.cover_id;
    } else {
        return `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`;
    }
}


function ItemDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const item = state?.item;

    function handleCheckout() {
        navigate("/checkout", { state: { item } });
    }

    function handleHold() {
        navigate("/account", {
            state: {
                newHold: {
                    holdId: `new-${Date.now()}`,
                    title: item.Title,
                    holdDate: new Date().toISOString().slice(0, 10),
                    status: "Waiting",
                },
            },
        });
    }
    function handleBack() {
        navigate("/search");
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
                            <section className={styles['book-cover']}>
                                <img src={getCover(item)} alt={item.Title} />
                            </section>
                        )}
                    </div>

                    <div className={styles["right"]}>
                        <div className={styles["info-box"]}>
                            <p>Book Title: {item.Title}</p>
                            <p>Author: {item.Author}</p>
                            <p>Description: {item.Description}
                            </p>
                            <p>Publisher: {item.Publisher}</p>
                            <p>Genre: {item.Genre}</p>
                            <p>
                                Availability: {item.AvailableCopies}/{item.TotalCopies} Copies Available
                            </p>
                            <p>Loan Period: {item.LoanPeriodDays} Days</p>

                        </div>
                        {item.AvailableCopies > 0 ? (
                            <button className={styles["checkout-btn"]} onClick={handleCheckout}>
                                Checkout
                            </button>
                        ) : (
                            <button className={styles["checkout-btn"]} onClick={handleHold}>
                                Place Hold
                            </button>
                        )}
                        <button className={styles["checkout-btn"]} onClick={handleBack}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ItemDetails;
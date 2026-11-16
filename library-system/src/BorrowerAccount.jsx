import BorrowerNavbar from "./components/BorrowerNavbar.jsx";
import { useLocation } from "react-router-dom";
import styles from "./BorrowerAccount.module.css";
import Footer from "./components/Footer.jsx";
import { borrowers, items, wishlist } from "./data/mockData.js";

function BorrowerAccount() {

    const hobbit = items.find(i => i.itemId === "I1001");
    const { state } = useLocation();
    const item = state?.item;
    const newWishlist = state?.newWishlist;
    const user = borrowers[0];

    const userWishlist = wishlist.filter(w => w.borrowerId === user.borrowerId);
    if (newWishlist) userWishlist.push(newWishlist);

    return (
        <div>
            <div>
                <BorrowerNavbar />
            </div>

            <section className={styles['user-info']}>
                <h1 className={styles['text-design']}> Borrower Information</h1>
                <label className={styles['text-design']}>Name: {user.firstName} {user.lastName}</label>
                <label className={styles['text-design']}>Email: {user.email}</label>
                <label className={styles['text-design']}>Phone: {user.phone}</label>
            </section>

            <section className={styles['user-info']}>
                <h1 className={styles['text-design']}>Checked Out</h1>

                <div className={styles['flex-direction']}>
                    <label className={styles['text-design']}>{hobbit.title}</label>
                    <div>
                        <button className={styles['button']}>Renew</button>
                        <button className={styles['button']}>Return</button>
                    </div>
                </div>

                {item && item.ItemID !== hobbit.itemId && (
                    <div className={styles['flex-direction']}>
                        <label className={styles['text-design']}>{item.Title ?? item.title}</label>
                        <div>
                            <button className={styles['button']}>Renew</button>
                            <button className={styles['button']}>Return</button>
                        </div>
                    </div>
                )}
            </section>

            <section className={styles['user-info']}>
                <h1 className={styles['text-design']}>Fines</h1>
                <label className={styles['text-design']}>None</label>
            </section>

            <section className={styles['user-info']}>
                <h1 className={styles['text-design']}>Wishlist</h1>
                {userWishlist.length > 0 ? (
                    userWishlist.map(w => (
                        <label key={w.wishlistId} className={styles['text-design']}>
                            {w.title} by {w.author} ({w.status})
                        </label>
                    ))
                ) : (
                    <label className={styles['text-design']}>None</label>
                )}
            </section>
            <Footer />
        </div>
    );
}

export default BorrowerAccount;
import BorrowerNavbar from "./components/BorrowerNavbar.jsx";
import styles from "./BorrowerAccount.module.css";
import Footer from "./components/Footer.jsx";

// Placeholder data until the backend is connected
const user = {
    name: "Micheal",
    email: "micheal_smith@mail.com",
    phone: "111-111-1111",
};

const checkedOut = [
    { id: 1, title: "The Golden Key", due: "YYYY/MM/DD" },
    { id: 2, title: "The Alchemist", due: "YYYY/MM/DD" },
];

const fines = [];
const wishlist = [];

function BorrowerAccount() {


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
                {checkedOut.map((book) => (
                    <div className={styles['flex-direction']}><label key={book.id} className={styles['text-design']}>
                        {book.title}: Due {book.due}
                    </label>
                        <div>
                            <button className={styles['button']}>Renew</button>
                            <button className={styles['button']}>Return</button>
                        </div>
                    </div>
                ))}
            </section>

            <section className={styles['user-info']}>
                <h1 className={styles['text-design']}>Fines</h1>
                <label className={styles['text-design']}>None</label>
            </section>

            <section className={styles['user-info']}>
                <h1 className={styles['text-design']}>Wishlist</h1>
                <label className={styles['text-design']}>None</label>
            </section>
            <Footer/>
        </div>
    );
}



export default BorrowerAccount;
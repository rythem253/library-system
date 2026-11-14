import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BorrowerNavbar from "./components/BorrowerNavbar.jsx";
import styles from "./Home.module.css";
import Footer from "./components/Footer.jsx";


function Home() {
    const [books, setBooks] = useState([]); //create empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleView = () => {
        alert("Ops, the book is not available at the library currently")
    }

    useEffect(() => {
        const controller = new AbortController();

        async function loadBooks() {
            try {
                const res = await fetch(
                    "https://openlibrary.org/trending/daily.json",
                    { signal: controller.signal }
                );
                if (!res.ok) throw new Error("Request failed");
                const data = await res.json();
                setBooks(data.works.slice(0, 10)); //setBooks array is populated
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadBooks();
        return () => controller.abort();
    }, []);

    return (
        <div>
            <BorrowerNavbar />

            <div className={styles['trending-heading']} >
                <h1>Top 10 Trending Books Today</h1>
            </div>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && books.length === 0 && <p>No books found.</p>}

                <ul className={styles['trending-books']}>
                    {books.map((book) => (
                        <li key={book.key} className={styles['book-item']}>
                            {book.cover_i && (
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                    alt={book.title}
                                />
                            )}
                            <div className={styles['book-info']}>
                                <p className={styles['book-title']}>{book.title}</p>
                                <p>{book.author_name?.join(", ")}</p>
                                <button onClick={handleView}>Checkout</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer/>
        </div>

    );
}

export default Home;

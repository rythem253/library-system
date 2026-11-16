import { useState } from 'react';
import BorrowerNavbar from './components/BorrowerNavbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import styles from './Search.module.css';
import SelectButton from './components/SelectButton.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from "./components/Footer.jsx";

import Items from './components/items.json';

function getCover(item) {
    if (String(item.cover_id).startsWith('/')) {
        return item.cover_id;
    } else {
        return `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`;
    }
}


function Search() {

    const navigate = useNavigate();

    const [genre, setGenre] = useState('');
    const [type, setType] = useState('');
    const [author, setAuthor] = useState('');
    const authors = [...new Set(Items.map((item) => item.Author).filter(Boolean))];
    const [query, setQuery] = useState('');

    //Filter Data;
    const q = String(query ?? '').toLowerCase();

    const results = Items.filter((item) =>
        String(item.Title ?? '').toLowerCase().includes(q) &&
        (genre === '' || item.Genre === genre) && (author === '' || item.Author === author) &&
        (type === '' || item.ItemTypeID === type)
    );

    

    return (
        <div>
            <BorrowerNavbar />
            <div className={styles['search-bar']}>
                <SearchBar query={query} setQuery={setQuery} />
            </div>
            <div className={styles['filter-container']}>
                <div>
                    <label className={styles['filter-lbl']}>Filter</label>
                </div>
                <div>
                    <label htmlFor="genre" className={styles['filter-lbl']}>Genre</label>
                    <select
                        id="genre"
                        className={styles['genre-select']}
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="mystery">Mystery</option>
                        <option value="science-fiction">Science Fiction</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="technology">Technology</option>
                    </select>
                    <label htmlFor="author" className={styles['filter-lbl']}>Author</label>
                    <select
                        id="author"
                        className={styles['genre-select']}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    >
                        <option value="">All</option>
                        {authors.map((a) => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>

                    <label htmlFor="genre" className={styles['filter-lbl']}>Type</label>
                    <select
                        id="type"
                        className={styles['genre-select']}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="BOOK">Book</option>
                        <option value="JOURNAL">Journal</option>
                        <option value="RESEARCH_PAPER">Research Paper</option>
                        <option value="ELECTRONIC_DEVICE">Electronic Device</option>
                    </select>

                </div>
                <div>
                </div>
            </div>

            <div className={styles['book-grid']}>
                {results.length === 0 && <p>No items found.</p>}
                {results.map((item) => (
                    <section key={item.ItemID} className={styles['book-card']}>
                        <section className={styles['book-cover']}>
                            <img src={getCover(item)} alt={item.Title} />
                        </section>
                        <div className={styles['book-placement']}>
                            <p className={styles['book-title']}>{item.Title}</p>
                             <p className={styles['book-description']}>by {item.Author}</p>
                            <p className={styles['book-description']}> {item.Description}</p>
                            <p className={styles['book-description']}> {item.Status}</p>                       
                            <SelectButton onClick={() => navigate("/item-details", { state: { item } })} />
                        </div>
                    </section>

                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Search;
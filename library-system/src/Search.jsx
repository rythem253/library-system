import { useState } from 'react';
import BorrowerNavbar from './components/BorrowerNavbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import styles from './Search.module.css';
import SelectButton from './components/SelectButton.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from "./components/Footer.jsx";

import Items from './components/items.json';

function Search() {

    const navigate = useNavigate();

    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');
    const [type, setType] = useState('');

    const [query, setQuery] = useState('');

    //Filter Data;
    const results = Items.filter((item) =>
    item.Title.toLowerCase().includes(query.toLowerCase()) &&
    (genre === '' || item.Genre === genre) &&
    (author === '' || item.Author === author) &&
    (type === '' || item.ItemTypeID === type)
);

    return (
       <div>
            <BorrowerNavbar />
            <div>
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
                        <option value="jk-rowling">JK Rowling</option>
                        <option value="pablo-picasso">Pablo Picasso</option>
                        <option value="agatha-christie">Agatha Christie</option>
                        <option value="mit-open-lab">MIT Open Lab</option>
                        <option value="zhang-lee">Zhang Lee</option>
                        <option value="matias-jonas">Matias Jonas</option>
                    </select>
                    <label htmlFor="type" className={styles['filter-lbl']}>Type</label>
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
                            <p>Cover</p>
                        </section>
                        <div className={styles['book-placement']}>
                            <p className={styles['book-title']}>{item.Title}</p>
                            <p className={styles['book-title']}> {item.Description}</p>
                            <p className={styles['book-title']}> {item.Status}</p>
                            <p className={styles['book-title']}>by {item.Author}</p>
                            <SelectButton onClick={() => navigate("/item-details", { state: { item } })} />
                        </div>
                    </section>
                    
                ))}
            </div>
            <Footer/>
        </div>
    );
}

export default Search;
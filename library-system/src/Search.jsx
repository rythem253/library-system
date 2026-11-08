import { useState } from 'react';
import BorrowerNavbar from './components/BorrowerNavbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import styles from './Search.module.css';

function Search() {
    const [genre, setGenre] = useState('');

    return (
        <div>
            <BorrowerNavbar />
            <div>
                <SearchBar />
            </div>
            <div className={styles['filter-container']}>
                <label className={styles['filter-lbl']}>Filter</label>
                <label htmlFor="genre" className={styles['filter-lbl']}>Genre</label>
                <select
                    id="genre"
                    className={styles['genre-select']}
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                    <option value="">All genres</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                    <option value="mystery">Mystery</option>
                    <option value="science-fiction">Science Fiction</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="technology">Technology</option>
                </select>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Search;
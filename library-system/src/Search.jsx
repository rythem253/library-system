import { useState } from 'react';
import BorrowerNavbar from './components/BorrowerNavbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import styles from './Search.module.css';

function Search() {
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');
    const [type, setType] = useState('');

    return (
        <div>
            <BorrowerNavbar />
            <div>
                <SearchBar />
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
                        <option value="book">Book</option>
                        <option value="journal">Journal</option>
                        <option value="research-paper">Research Paper</option>
                        <option value="laptop">Laptop & MacBooks</option>
                        <option value="equipment">Other Equipment</option>
                    </select>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default Search;
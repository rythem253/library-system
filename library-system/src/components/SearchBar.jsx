import styles from './SearchBar.module.css';

function SearchBar({query, setQuery}) {
    return (
        <div>
            <div className={styles['search-bar']}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search items..."
                />
                <button className={styles['search-btn']}>Search</button>
            </div>
        </div>
    );
}

export default SearchBar;
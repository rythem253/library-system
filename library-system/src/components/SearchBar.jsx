import styles from './SearchBar.module.css';

function SearchBar({ query, setQuery, onSearch }) {
    return (
        <div>
            <div className={styles['search-bar']}>
                <input className={styles['search-input']}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    placeholder="Search items..."
                />
                <button className={styles['search-btn']} onClick={onSearch}>Search</button>
            </div>
        </div>
    );
}

export default SearchBar;
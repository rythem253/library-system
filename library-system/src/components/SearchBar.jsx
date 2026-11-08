import styles from './SearchBar.module.css';

function SearchBar() {
    return (
        <div>
            <div className={styles['search-bar']}>
                <input
                    type="search"
                    className={styles['search-placeholder']}
                    placeholder="Search items..."
                />
                <button className={styles['search-btn']}>Search</button>
            </div>
        </div>
    );
}

export default SearchBar;
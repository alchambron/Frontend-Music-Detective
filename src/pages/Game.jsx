import React, { useState } from 'react'
import Play from '../components/Play'
import SearchBar from '../components/SearchBar'

export default function Game() {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <div className='game'>
            <Play searchResults={searchResults} />
            <SearchBar onSearchResults={handleSearchResults} />
        </div>
    )
}

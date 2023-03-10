import React, { useState } from 'react'
import Play from '../components/Play'
import SearchBar from '../components/SearchBar'

export default function Game() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchBarReset, setSearchBarReset] = useState(false)

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    function handleResetSearchBar(e){
        setSearchBarReset(e)
        setTimeout(() => {
            setSearchBarReset(false)
        }, 2000)
    }

    return (
        <div className='game'>
            <Play searchResults={searchResults} manageSearchBar={e => handleResetSearchBar(e)} />
            <SearchBar onSearchResults={handleSearchResults} searchBarReset={searchBarReset} />
        </div>
    )
}

import React from 'react'
import Play from '../components/Play'
import SearchBar from '../components/SearchBar'

export default function Game() {
    return (
        <div className='game'>
            <Play />
            <SearchBar />
        </div>
    )
}
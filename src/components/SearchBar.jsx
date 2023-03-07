import React, { useState } from 'react'

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const response = await fetch(
            `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${value}&api_key=b2a9b1fbf2e2b05b631544487aeb2b21&format=json`
        );
        const data = await response.json();
        // Si des résultats ont été trouvés
        if (data.results?.trackmatches?.track) {
            // On crée une liste d'objets avec le titre et l'artiste des 3 premiers résultats
            const results = data.results.trackmatches.track.map((track) => ({
                title: track.name,
                artist: track.artist,
            })).slice(0, 3);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchClick = (result) => {
        // On met à jour la barre de recherche avec le titre et l'artiste sélectionnés
        setSearchTerm(`${result.title} - ${result.artist}`);
        // On vide la liste de résultats
        setSearchResults([]);
        // On enregistre l'artiste et le titre de la chanson sélectionnée
        setSelectedTrack({ artist: result.artist, track: result.title });
        // On indique que la réponse est correcte
        setIsCorrectAnswer(true);
    };
    return (
        <div className='search-bar'>
            <input
                className="search-input"
                type="text"
                placeholder="TicTacTicTac...."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <ul className="search-results">
                {searchResults.map((result) => (
                    <li
                        key={`${result.title}-${result.artist}`}
                        onClick={() => handleSearchClick(result)}
                    >
                        {result.title} - {result.artist}
                    </li>
                ))}
            </ul>
        </div>
    )
}
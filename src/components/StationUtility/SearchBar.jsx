import React, { useEffect, useState } from "react";

export default function SearchBar({ onSearchResults, searchBarReset }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${value}&api_key=${import.meta.env.VITE_API_KEY_LAST_FM}&format=json`

    );
    const data = await response.json();

    if (data.results?.trackmatches?.track) {
      const results = data.results.trackmatches.track
        .map((track) => ({
          title: track.name,
          artist: track.artist,
        }))
        .slice(0, 3);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchClick = (result) => {
    setSearchTerm(`${result.title} - ${result.artist}`);
    setSearchResults([]);
    const searchResult = { title: result.title, artist: result.artist };
    onSearchResults(searchResult);
  };

  useEffect(() => {
    if (searchBarReset) {
      setSearchTerm(" ");
    }
  }, [searchBarReset]);

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Ecrivez un titre..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="search__results">
        {searchResults.map((result) => (
          <li
            key={`${result.title}-${result.artist}`}
            onClick={() => handleSearchClick(result)}
            className="search__results__elements"
          >
            {result.title} - {result.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

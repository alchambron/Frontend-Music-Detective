import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Game from "./Game"

export default function ChoicePlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  function ChoicePlaylist(id) {
    navigate(`/game/${id}`);
  }

  useEffect(() => {
    async function getPlaylists() {
      try {
        const response = await fetch(
          "https://musicdetective.herokuapp.com/playlists",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const playlistsData = await response.json();

        setPlaylists(playlistsData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getPlaylists();
  }, []);

  return isloading ? (
    "Wait Loading"
  ) : (
    <>
      <div>
        <h1>Choisissez une playlist de musique</h1>

        {playlists.map((list) => (
          <div key={list.id}>
            <button onClick={() => ChoicePlaylist(list.id)}>
              <div className="ResultChoice">
                {list.country}

                {list.year}
                {list.genre}
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

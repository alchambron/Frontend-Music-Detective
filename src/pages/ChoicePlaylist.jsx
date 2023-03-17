import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Game from "./Game";
import { NavLink } from "react-router-dom";

export default function ChoicePlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function ChoicePlaylist(id) {
    // creer une nouvelle partie pour track le scrore
    // handle l'url pour la producion
    // pour la production ca ne devrait pas etre http://localhost:3000

    const response = await fetch(import.meta.env.VITE_BASE_URL + `/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const score = await response.json();

    navigate(`/game/${id}/${score.id}`);
  }

  useEffect(() => {
    async function getPlaylists() {
      try {
        const response = await fetch(
          import.meta.env.VITE_BASE_URL + "/playlists",
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

  return (
    <>
      {isloading ? null : (
        <div className="playlist">
          <div className="leave">
            <NavLink to="/">
              <p>Retour</p>
            </NavLink>
          </div>

          <div className="playlist__title">
            <h1>Choisi ta playlist !</h1>
          </div>

          <div className="playlist__body">
            <h3> Par années</h3>
            <div className="playlist__body__content">
              {playlists.map((list) =>
                list.playlist_type == "Années" ? (
                  <div key={list.id} className="playlist__body__content__card">
                    <button
                      className="button"
                      onClick={() => ChoicePlaylist(list.id)}
                    ></button>
                    <h3>{list.title}</h3>
                  </div>
                ) : null
              )}
            </div>
          </div>

          <div className="playlist__body">
            <h3> Par genre</h3>
            <div className="playlist__body__content">
              {playlists.map((list) =>
                list.playlist_type == "Genre" ? (
                  <div key={list.id} className="playlist__body__content__card">
                    <button
                      className="button"
                      onClick={() => ChoicePlaylist(list.id)}
                    ></button>
                    <h3>{list.title}</h3>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      )}
      <div className="orange-background"></div>
    </>
  );
}

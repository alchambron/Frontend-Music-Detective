import React, { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ChoicePlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const loggedUser = useSelector((state) => {
    return state.user;
  });

  async function ChoicePlaylist(id) {
    let params = {};
    if (loggedUser) {
      params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: parseInt(loggedUser.id) }),
      };
    } else {
      params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: "000" }),
      };
    }

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/games`,
      params
    );

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
            <h1>Choisis ta playlist !</h1>
          </div>

          <div className="playlist__body">
            <h3> Par années</h3>
            <div className="playlist__body__content">
              {playlists.map((list) =>
                list.playlist_type == "Années" ? (
                  <div key={list.id} className="playlist__body__content__card">
                    <img
                      src={list.thumbnail_url}
                      alt="playlist_thumbnail"
                      className="button"
                      onClick={() => ChoicePlaylist(list.id)}
                    />

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
                    <img
                      src={list.thumbnail_url}
                      alt="playlist_thumbnail"
                      className="button"
                      onClick={() => ChoicePlaylist(list.id)}
                    />
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

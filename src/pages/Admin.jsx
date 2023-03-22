import React, { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Admin() {
  const [playlistData, setPlaylistData] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState(false);

  const [form, setForm] = useState({
    title: " ",
    playlist_type: " ",
    country: " ",
    playlist_url: " ",
    thumbnail_url: " ",
  });

  async function fetchPlaylistData() {
    const response = await fetch(import.meta.env.VITE_BASE_URL + "/playlists");
    const data = await response.json();
    setPlaylistData(data);
  }
  useEffect(() => {
    fetchPlaylistData();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    const params = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    };
    console.log(params);

    try {
      const data = await fetch(
        import.meta.env.VITE_BASE_URL + "/playlists",
        params
      );
      setNewPlaylist(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      AddSong();
    }, 1000);
  }, [newPlaylist]);

  async function AddSong() {
    const data = await fetch(import.meta.env.VITE_BASE_URL + "/add_song");
    console.log("Sons ajouté");
  }

  return (
    <>
      <div className="leave">
        <NavLink to="/">
          <p>Retour</p>
        </NavLink>
      </div>
      <div className="admin">
        <div className="admin__form">
          <h1>Ajouter une playlist</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <label>Titre de la playlist</label>
            <input type="text" id="title" onChange={handleChange} />

            <label>Type</label>
            <select id="playlist_type" onChange={handleChange}>
              <option>Selectionner un choix</option>
              <option value="Années">Années</option>
              <option value="Genre">Genre</option>
            </select>

            <label>Country</label>
            <select id="country" onChange={handleChange}>
              <option>Selectionner un choix</option>
              <option value="international">International</option>
              <option value="france">France</option>
            </select>

            <label>ID de la plylist</label>
            <input type="text" id="playlist_url" onChange={handleChange} />

            <label>Lien de la thumbnail</label>
            <input type="text" id="thumbnail_url" onChange={handleChange} />

            <input type="submit" />
          </form>
        </div>

        <div className="admin__update">
          <hr />
          <h1>Update songs</h1>
          <button onClick={AddSong}>Update</button>
        </div>

        <div className="admin__playlist">
          <hr />
          <h1>liste des playlist</h1>
          <div>
            {playlistData.map((playlist, index) => (
              <div className="admin__playlist__elements" key={index}>
                <h3>{playlist.title}</h3>
                <NavLink to={`/admin/edit/${playlist.id}`}>Editer</NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="orange-background"></div>
    </>
  );
}

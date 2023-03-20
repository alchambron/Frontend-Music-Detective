import React, { useState } from "react";
import { useEffect } from "react";

export default function Admin() {
  const [playlistData, setPlaylistData] = useState([]);

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

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddSong() {
    const data = await fetch(import.meta.env.VITE_BASE_URL + "/add_song");
    console.log(data);
  }

  return (
    <>
      <div>Admin</div>

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

      <div>
        <h1>Update songs</h1>
        <button onClick={handleAddSong}>Update</button>
      </div>

      <div>
        <h1>liste des playlist</h1>
        <div>
          {playlistData.map((playlist, index) => (
            <p key={index}>{playlist.title}</p>
          ))}
        </div>
      </div>

      <div className="orange-background"></div>
    </>
  );
}

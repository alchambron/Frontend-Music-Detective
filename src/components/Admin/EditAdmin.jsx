import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function EditAdmin() {
  const playlistID = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: " ",
    playlist_type: " ",
    country: " ",
    playlist_url: " ",
    thumbnail_url: " ",
  });

  async function fetchPlaylistData() {
    const response = await fetch(
      import.meta.env.VITE_BASE_URL +
        `/playlists/${parseInt(playlistID.playlistID)}`
    );
    const data = await response.json();
    setForm({
      ...form,
      title: data.title,
      playlist_type: data.playlist_type,
      country: data.country,
      playlist_url: data.playlist_url,
      thumbnail_url: data.thumbnail_url
    })
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPlaylistData();
  }, []);

  async function handleSubmit(e) {

    e.preventDefault();

    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    };
    try {
      await fetch(import.meta.env.VITE_BASE_URL + `/playlists/${playlistID.playlistID}`, params);
      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  }

  return isLoading ? null : (
    <>
      <div className="leave">
            <NavLink to="/admin">
              <p>Retour</p>
            </NavLink>
          </div>
      <div className="admin">
        <div className="admin__form">
          <form onSubmit={handleSubmit}>
            <label>Titre de la playlist</label>
            <input
              type="text"
              id="title"
              value={form.title}
              onChange={handleChange}
            />

            <label>Type</label>
            <select value={form.playlist_type} id="playlist_type" onChange={handleChange}>
              <option>Selectionner un choix</option>
              <option value="Années">Années</option>
              <option value="Genre">Genre</option>
            </select>

            <label>Country</label>
            <select value={form.country} id="country" selected onChange={handleChange}>
              <option>Selectionner un choix</option>
              <option value="International">International</option>
              <option value="France">France</option>
            </select>

            <label>ID de la playlist</label>
            <input
              type="text"
              id="playlist_url"
              value={form.playlist_url}
              onChange={handleChange}
            />

            <label>Lien de la thumbnail</label>
            <input
              type="text"
              id="thumbnail_url"
              value={form.thumbnail_url}
              onChange={handleChange}
            />

            <input type="submit" />
          </form>
        </div>
        <div className="orange-background"></div>
      </div>
    </>
  );
}

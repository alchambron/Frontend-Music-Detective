const musicService = async (id) => {
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      playlist_id: id,
    }),
  };

  try {
    const response = await fetch(
      import.meta.env.VITE_BASE_URL + "/get_playlist_data",
      params
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { musicService };
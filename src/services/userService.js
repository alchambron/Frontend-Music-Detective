import Cookies from "js-cookie";

const getUserProfile = async () => {
  const token = Cookies.get("user_token");
  if (!token) {
    return;
  }
  const params = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const response = await fetch(
    import.meta.env.VITE_BASE_URL + "/member-data",
    params
  );
  const data = await response.json();
  const user = data.user;
  return user;
};

export { getUserProfile };
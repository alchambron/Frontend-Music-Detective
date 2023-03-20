import { USER_LOGIN, USER_LOGOUT } from "../actionTypes/actionTypes";

const loginUser = (user) => {
  return {
    type: USER_LOGIN,
    payload: user,
  };
};

const logoutUser = () => {
  return {
    type: USER_LOGOUT,
  };
};

export { loginUser, logoutUser };

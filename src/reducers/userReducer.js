import { USER_LOGIN, USER_LOGOUT } from "../actionTypes/actionTypes";

const initialState = {
  user: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: { ...action.payload },
      };

    case USER_LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

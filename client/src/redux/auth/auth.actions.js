import setAuthToken from "../../utils/setAuthToken";

import authTypes from "./auth.types";

export const setCurrentUser = (userData) => {
  return {
    type: authTypes.SET_CURRENT_USER,
    payload: userData,
  };
};

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

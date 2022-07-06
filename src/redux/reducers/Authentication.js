import * as actionTypes from "../action_types";
const defaultState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : undefined,
};
const Authentication = (state = defaultState, action = {}) => {
  try {
    switch (action.type) {
      case actionTypes.AUTHENTICATION:
        let { user, accessToken } = action;
        /* localStorage.setItem("feathers-jwt", accessToken);
        localStorage.setItem("user", JSON.stringify(user)); */

        return {
          ...state,
          user,
        };
        break;
      case actionTypes.LOGOUT:
        /* window.localStorage.clear();
        window.localStorage.removeItem("user"); */
        return {
          user: undefined,
        };
        break;
      default:
        return state;
        break;
    }
  } catch (err) {
    console.log("ERROR:", err.message);
  }
};
export default Authentication;

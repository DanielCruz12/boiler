import * as actionTypes from "../action_types";
import { DEFAULT_LOGO } from "../../constants/";
import defaaultTheme from "../../theme.json";
const defaultState = {
  theme: localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme"))
    : defaaultTheme,
  logo: DEFAULT_LOGO,
};
const DesignSystem = (state = defaultState, action = {}) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      window.localStorage.setItem("theme", JSON.stringify(action.theme));
      return {
        ...state,
        theme: action.theme,
      };
      break;
    case actionTypes.CHANGE_LOGO:
      return {
        ...state,
        logo: action.logo,
      };
      break;
    default:
      return state;
      break;
  }
};
export default DesignSystem;

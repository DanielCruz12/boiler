import * as actionTypes from "../action_types";
const defaultState = {
  collapsed: false,
};
const Base = (state = defaultState, action = {}) => {
  switch (action.type) {
    case actionTypes.COLLAPSED_MENU:
      return {
        ...state,
        collapsed: action.collapsed,
      };
      break;
    default:
      return state;
      break;
  }
};
export default Base;

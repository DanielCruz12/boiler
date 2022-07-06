import { combineReducers } from "redux";
import { Base, Authentication, DesignSystem } from "./reducers/";
const rootReducer = combineReducers({
  base: Base,
  auth: Authentication,
  design: DesignSystem,
});
export default rootReducer;

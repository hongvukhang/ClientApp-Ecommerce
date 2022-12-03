import { createStore } from "redux";

const togglePopup = (state = { toggle: false, isLogin: false }, action) => {
  if (action.type === "SHOW_POPUP") {
    return {
      ...state,
      toggle: true,
    };
  }
  if (action.type === "HIDDEN_POPUP") {
    return {
      ...state,
      toggle: false,
    };
  }
  if (action.type === "ON_LOGIN") {
    return {
      ...state,
      isLogin: true,
    };
  }
  if (action.type === "ON_LOGOUT") {
    return {
      ...state,
      isLogin: false,
    };
  }
  return state;
};

const store = createStore(togglePopup);
export default store;

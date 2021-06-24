import { FETCH_WEATHER, SET_LOADED } from "./actions";

// const initialState = {
//   main: {},
//   name: null,
//   weather: [],
//   isLoading: false,
// }

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...state, ...action.payload, isLoading: true }
    case SET_LOADED:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
};

export default reducer;
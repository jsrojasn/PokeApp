import {ADD_POKEMON, REMOVE_POKEMON, LOCAL_STORAGE_FAVORITES} from "../utils/constants"

export const initialState = {
  pokemons: [],
};

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES)) || initialValue;

export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case ADD_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case REMOVE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.filter(
          (pokemon) => pokemon !== action.payload
        ),
      };
    
    default:
      return state;
  }
}

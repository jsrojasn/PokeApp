import { createContext, useReducer, useEffect } from "react";
import {favoritesReducer, initialState, initializer} from "./FavoritesReducer";
import {ADD_POKEMON, REMOVE_POKEMON, LOCAL_STORAGE_FAVORITES} from "../utils/constants"



export const FavoritesContext = createContext(initialState);

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState, initializer);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify(state));
  }, [state]);

  function addPokemon(pokemon) {
    dispatch({
      type: ADD_POKEMON,
      payload: pokemon,
    });
  }

  function deletePokemon(pokemon) {
    dispatch({
      type: REMOVE_POKEMON,
      payload: pokemon,
    });
  }

  

  return (
    <FavoritesContext.Provider
      value={{
        pokemons: state.pokemons,
        addPokemon,
        deletePokemon,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};



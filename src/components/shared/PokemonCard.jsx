import { useContext } from "react";
import { MdCatchingPokemon } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import pokeball from "../../assets/pokeball.png";
import openPokeball from "../../assets/pokeball-open.png";
import { FavoritesContext } from "../../context/FavoritesState";

const PokemonCard = ({ name }) => {
  const { addPokemon, pokemons, deletePokemon } = useContext(FavoritesContext);
  const isFavorite = pokemons.some((pokemon) => pokemon === name);
  return (
    <div className="max-w bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center pt-5">
        <img
          className="rounded-t-lg"
          src={isFavorite ? pokeball : openPokeball}
          alt="Pokeball"
          width="90px"
          margin="0 auto"
        />
      </div>
      <div className="flex justify-between align-center p-5">
        <Link to={`/pokemons/${name}`}>
          <h5 className=" text-2xl font-bold  text-gray-900 dark:text-white">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h5>
        </Link>

        <button
          onClick={() => (isFavorite ? deletePokemon(name) : addPokemon(name))}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isFavorite ? "Free Pokemon" : "Catch Pokemon"}
          <MdCatchingPokemon className="ml-2" />
        </button>
      </div>
    </div>
  );
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PokemonCard;

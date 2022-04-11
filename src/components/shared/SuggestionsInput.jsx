import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SuggestionsInput = ({
  searchText,
  setSearchText,
  isSearching,
  filteredPokemons,
}) => {
  return (
    <div className="relative flex pt-2">
      <span className="py-2 text-sky-800 pr-2">Search</span>
      <div className="flex flex-col bg-white">
        <input
          className="border-2 border-sky-800 appearance-none rounded py-1 px-3 text-grey-darker"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {isSearching && (
          <div className="border absolute top-12  bg-white flex w-4/5 flex-col rounded border-sky-800 ">
            {filteredPokemons.length > 0 ? (
              filteredPokemons.map((pokemon, index) => (
                <Link
                  className="cursor-pointer w-full px-3 border border-2 border-sky-800"
                  key={pokemon + index}
                  to={`/pokemons/${pokemon}`}
                >
                  {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
                </Link>
              ))
            ) : (
              <div className="px-3">No pokemons found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

SuggestionsInput.propTypes = {
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  filteredPokemons: PropTypes.array.isRequired,
};

export default SuggestionsInput;

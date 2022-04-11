import { useContext, useState, useEffect } from "react";
import NavBar from "../components/layout/Navbar";
import PokemonCard from "../components/shared/PokemonCard";
import SuggestionsInput from "../components/shared/SuggestionsInput";
import { FavoritesContext } from "../context/FavoritesState";
import AnimatedContainer from "../components/layout/AnimatedContainer";

const Favorites = () => {
  const { pokemons } = useContext(FavoritesContext);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter((pokemon) =>
        pokemon.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
  }, [searchText, pokemons]);

  const isSearching = searchText.trim().length >= 1;

  return (
    <AnimatedContainer>
      <div className="w-full h-screen">
        <div className="container mx-auto pb-16 overflow-auto px-4 max-h-full">
          <div className="flex flex-wrap justify-between content-center">
            <h1 className="text-center text-2xl font-black py-3">
              My Favorites
            </h1>
            <SuggestionsInput
              searchText={searchText}
              setSearchText={setSearchText}
              isSearching={isSearching}
              filteredPokemons={filteredPokemons}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-3">
            {isSearching
              ? filteredPokemons.map((name, index) => (
                  <PokemonCard key={name + index} name={name} />
                ))
              : pokemons.map((name, index) => (
                  <PokemonCard key={name + index} name={name} />
                ))}
          </div>
        </div>

        <NavBar />
      </div>
    </AnimatedContainer>
  );
};

export default Favorites;

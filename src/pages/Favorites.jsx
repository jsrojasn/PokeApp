import { useContext, useState, useEffect } from "react";
import NavBar from "../components/layout/Navbar";
import PokemonCard from "../components/shared/PokemonCard";
import { FavoritesContext } from "../context/FavoritesState";
import AnimatedContainer from "../components/layout/AnimatedContainer";

const Favorites = () => {
  const { pokemons } = useContext(FavoritesContext);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter((pokemon) => pokemon.toLowerCase().includes(searchText.trim().toLowerCase()))
    );
  }, [searchText, pokemons]);

  const isSearching = searchText.trim().length >= 1;

  return (
    <AnimatedContainer>
      <div className="w-full h-screen">
        <div className="container mx-auto pb-16">
          <div className="flex justify-between content-center">
            <h1 className="text-center text-2xl font-black py-3">
              My Favorites
            </h1>
            <div className="flex items-center pt-2">
                <span className="py-2 text-sky-800 pr-2">Search</span>
                <input
                  className="border-2 border-sky-800 appearance-none rounded w-full py-1 px-3 text-grey-darker"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

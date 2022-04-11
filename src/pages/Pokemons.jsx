import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../components/layout/Navbar";
import PokemonCard from "../components/shared/PokemonCard";
import Pagination from "../components/layout/Pagination";
import Spinner from "../components/shared/Spinner";
import SuggestionsInput from "../components/shared/SuggestionsInput";
import ErrorMessage from "../components/shared/ErrorMessage";

const Pokemons = ({ query }) => {
  const [search, setSearch] = useSearchParams();
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const limit = 20;
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const offset = search.get("offset") || 0;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    let jobsSearchUrl = "https://pokeapi.co/api/v2/pokemon?";

    if (offset) {
      jobsSearchUrl += `&offset=${offset}`;
    }

    jobsSearchUrl += `&limit=${limit}`;

    fetch(jobsSearchUrl)
      .then((res) => res.json())
      .then((data) => {
        setNumberOfPages(Math.ceil(data.count / limit));
        setPokemons(data.results);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setHasError(true);
      });
  }, [offset, limit]);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
  }, [searchText, pokemons]);

  const isSearching = searchText.trim().length >= 1;

  if (hasError) return <ErrorMessage />;

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full h-screen">
      <div className="container mx-auto pb-16 overflow-auto px-4 max-h-full">
        <div className="flex flex-wrap justify-between content-center py-3">
          <h1 className="text-center text-2xl font-black py-3">All Pokemons</h1>
          <div className="flex flex-col items-end">
            <Pagination
              currentPage={Math.round(offset / limit + 1 || 1)}
              numberOfPages={isSearching ? 1 : numberOfPages}
              changePage={setSearch}
              limit={limit}
              isSearching={isSearching}
            />
            <SuggestionsInput
              searchText={searchText}
              setSearchText={setSearchText}
              isSearching={isSearching}
              filteredPokemons={filteredPokemons.map((pokemon) => pokemon.name)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-auto">
          {isSearching
            ? filteredPokemons.map(({ name }, index) => (
                <PokemonCard key={name + index} name={name} />
              ))
            : pokemons.map(({ name }, index) => (
                <PokemonCard key={name + index} name={name} />
              ))}
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default Pokemons;

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { FavoritesContext } from "../context/FavoritesState";
import pokeball from "../assets/pokeball.png";
import openPokeball from "../assets/pokeball-open.png";
import AnimatedContainer from "../components/layout/AnimatedContainer";
import ErrorMessage from "../components/shared/ErrorMessage";
import Spinner from "../components/shared/Spinner";

const Pokemon = () => {
  const params = useParams();
  const { pokemons } = useContext(FavoritesContext);
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isFavorite = pokemons.some((pokemon) => pokemon === params.id);
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    if (params.id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          setHasError(true);
        });
    }
  }, [params.id]);

  
  if (hasError) return <ErrorMessage />;
  
  if (isLoading) return <Spinner />;
  
  if (!pokemon) return null;

  const { name, abilities, stats, types, sprites } = pokemon;

  return (
    <AnimatedContainer>
      <div className="w-full h-screen">
        <div className="container mx-auto pt-5 pb-16">
          <h1 className="text-5xl font-black text-center">
            Details of {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <div className="flex justify-center my-5">
            <img
              className="rounded-t-lg"
              src={isFavorite ? pokeball : openPokeball}
              alt="Pokeball"
              width="150px"
              margin="0 auto"
            />
          </div>
          <div className="text-2xl font-black text-center">
            <h2 className="mb-3">
              {isFavorite
                ? "Is part of your favorites pokemons!"
                : "Is not part of your favorites pokemons!"}
            </h2>
            {sprites && sprites.back_default && (
              <div className="flex justify-center my-5">
                <img
                  className="rounded-t-lg"
                  src={sprites.back_default}
                  alt="Pokemon"
                  width="150px"
                  margin="0 auto"
                />
              </div>
            )}
            {abilities && (
              <h2>
                Abilities:
                {abilities.map(
                  (ability, index) =>
                    ` ${ability.ability.name} ${
                      index !== abilities.length - 1 ? "/ " : ""
                    }`
                )}
              </h2>
            )}
            {stats && (
              <h2>
                Stats:
                {stats.map(
                  (stat, index) =>
                    ` ${stat.stat.name} ${
                      index !== stats.length - 1 ? "/ " : ""
                    }`
                )}
              </h2>
            )}
            {types && (
              <h2>
                Types:
                {types.map(
                  (type, index) =>
                    ` ${type.type.name} ${
                      index !== types.length - 1 ? "/ " : ""
                    }`
                )}
              </h2>
            )}
          </div>

          <Navbar />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Pokemon;

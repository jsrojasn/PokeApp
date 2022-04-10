import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import { FavoritesContext } from "../../context/FavoritesState";

test("renders pokemon name", () => {
  render(<PokemonCard name="pikachu" />, { wrapper: MemoryRouter });
  const nameElement = screen.getByText(/pikachu/i);
  expect(nameElement).toBeInTheDocument();
});

test("renders free pokemon when pokemon is favorite", () => {
  render(
    <FavoritesContext.Provider value={{ pokemons: ["pikachu"] }}>
      <PokemonCard name="pikachu" />
    </FavoritesContext.Provider>,
    { wrapper: MemoryRouter }
  );
  const nameElement = screen.getByText(/free pokemon/i);
  expect(nameElement).toBeInTheDocument();
});

test("renders catch pokemon when pokemon is not favorite", () => {
  render(
    <FavoritesContext.Provider value={{ pokemons: [] }}>
      <PokemonCard name="pikachu" />
    </FavoritesContext.Provider>,
    { wrapper: MemoryRouter }
  );
  const nameElement = screen.getByText(/catch pokemon/i);
  expect(nameElement).toBeInTheDocument();
});

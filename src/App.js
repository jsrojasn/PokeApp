import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../src/pages/Login";
import Pokemons from "./pages/Pokemons";
import Favorites from "./pages/Favorites";
import SinglePokemon from "./pages/SinglePokemon";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { FavoritesProvider } from "./context/FavoritesState";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route path="login" element={<Login />} />

          <Route
            path="pokemons"
            element={
              <ProtectedRoute>
                <Pokemons />
              </ProtectedRoute>
            }
          />
          <Route
            path="pokemons/:id"
            element={
              <ProtectedRoute>
                <SinglePokemon />
              </ProtectedRoute>
            }
          />
          <Route
            path="favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/pokemons" replace />} />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;

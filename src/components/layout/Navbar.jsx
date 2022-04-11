import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
      <div id="tabs" className="flex justify-between">
        <div
          className={`border w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 ${
            location.pathname === "/pokemons"
              ? "bg-sky-800 text-white border-sky-800"
              : ""
          }`}
        >
          <Link to="/pokemons">Pokemons</Link>
        </div>
        <div
          className={`border w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 ${
            location.pathname === "/favorites"
              ? "bg-sky-800 text-white border-sky-800"
              : ""
          }`}
        >
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

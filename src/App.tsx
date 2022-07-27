import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/page-found";
import PokemonsDetail from "./pages/pokemon-detail";
import PokemonList from "./pages/pokemon-list";

const App: FunctionComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">
              Pokedex
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemons/:id" element={<PokemonsDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

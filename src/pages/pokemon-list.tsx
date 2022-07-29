import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
import PokemonCard from "../components/pokemon-card";
import PokemonService from "../services/pokemon-service";
import { useNavigate } from "react-router-dom";

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    PokemonService.getPokemons().then((pokemons) => setPokemons(pokemons));
  }, []);

  return (
    <div>
      <h1 className="center">Pokédex</h1>

      <div className="container">
        <div className="row">
          {pokemons.map((pokemon) => (
            // <Link to={`/pokemons/${pokemon.id}`} key={pokemon.id}>
            //   {" "}
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
            // </Link>
          ))}
        </div>
      </div>
      <div>
        <span
          className="btn-floating btn-large waves-effect waves-light red z_depth-3"
          style={{ position: "fixed", bottom: "25px", right: "25px" }}
        >
          <i
            onClick={() => navigate("/pokemons/add")}
            className="material-icons"
          >
            add
          </i>
        </span>
      </div>
    </div>
  );
};

export default PokemonList;

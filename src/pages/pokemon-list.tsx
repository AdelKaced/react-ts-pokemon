import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
import POKEMONS from "../models/mock-pokemon";
import PokemonCard from "../components/pokemon-card";
import { Link } from "react-router-dom";

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    setPokemons(POKEMONS);
  }, []);

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="container">
        <div className="row">
          {pokemons.map((pokemon) => (
            // <Link to={`/pokemons/${pokemon.id}`} key={pokemon.id}>
            //   {" "}
              <PokemonCard  key={pokemon.id} pokemon={pokemon} />
            // </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;

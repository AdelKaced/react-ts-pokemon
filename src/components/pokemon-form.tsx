import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import { formatType } from "../helpers/lib";
import { useNavigate } from "react-router-dom";
import PokemonService from "../services/pokemon-service";

type Props = {
  pokemon: Pokemon;
  isEditForm: boolean;
};

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  id: number;
  name: Field;
  hp: Field;
  cp: Field;
  types: Field;
  picture: Field;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEditForm }) => {
  const [form, setForm] = useState<Form>({
    id: pokemon.id,
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true },
    picture: { value: pokemon.picture, isValid: true },
  });
  const navigate = useNavigate();

  const types: string[] = [
    "Plante",
    "Feu",
    "Eau",
    "Insecte",
    "Normal",
    "Electrik",
    "Poison",
    "Fée",
    "Vol",
    "Combat",
    "Psy",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fiedlValue: string = e.target.value;
    const fiedlName: string = e.target.name;
    const newField: Field = { [fiedlName]: { value: fiedlValue } };

    setForm({ ...form, ...newField });
  };

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldId: string = e.target.id;
    const fieldCheck: boolean = e.target.checked;
    console.log(fieldId);
    console.log(fieldCheck);

    let newField: Field;
    if (fieldCheck) {
      const newTypes: string[] = form.types.value.concat([fieldId]);
      newField = { value: newTypes };
    } else {
      const newTypes: string[] = form.types.value.filter(
        (type: string) => type !== fieldId
      );

      newField = { value: newTypes };
    }

    console.log(newField);

    setForm({ ...form, ...{ types: newField } });
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) { 
      pokemon.name = form.name.value;
      pokemon.hp = form.hp.value;
      pokemon.cp = form.cp.value;
      pokemon.types = form.types.value;
      pokemon.picture = form.picture.value;
 
      if (isEditForm) {
        PokemonService.updatePokemon(pokemon).then(() =>
          navigate(`/pokemons/${pokemon.id}`)
        );
      } else {
        PokemonService.addPokemon(pokemon).then(() =>
          navigate(`/pokemons/${pokemon.id}`)
        );
      }
    }
  };

  const validateForm = () => {
    let newForm: Form = form;

    // Validator url
    if (!isEditForm) {
      const start =
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
      const end = ".png";

      if (
        !form.picture.value.startsWith(start) ||
        !form.picture.value.endsWith(end)
      ) {
        const errorMsg: string = "L'url n'est pas valide.";
        const newField: Field = {
          value: form.picture.value,
          error: errorMsg,
          isValid: false,
        };
        newForm = { ...newForm, ...{ picture: newField } };
      } else {
        const newField: Field = {
          value: form.picture.value,
          error: "",
          isValid: true,
        };
        newForm = { ...newForm, ...{ picture: newField } };
      }
    }

    // Validator name
    if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
      const errorMsg: string = "Le nom du pokémon est requis (1-25).";
      const newField: Field = {
        value: form.name.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: Field = {
        value: form.name.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ name: newField } };
    }

    // Validator hp
    if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string =
        "Les points de vie du pokémon sont compris entre 0 et 999.";
      const newField: Field = {
        value: form.hp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField: Field = {
        value: form.hp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    }

    // Validator cp
    if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg: string =
        "Les dégâts du pokémon sont compris entre 0 et 99";
      const newField: Field = {
        value: form.cp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    } else {
      const newField: Field = {
        value: form.cp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    }

    setForm(newForm);
    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid && newForm.picture.isValid;
  };

  const isTypesValid = (type: string): boolean => {
    if (form.types.value.length === 1 && hasType(type)) {
      return false;
    }
    if (form.types.value.length >= 3 && !hasType(type)) {
      return false;
    }
    return true;
  };

  const deletePokemon = () => {
    PokemonService.deletePokemon(pokemon).then(() => navigate(`/pokemons`));
  };

  return (
    <form>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {isEditForm && (
              <div className="card-image">
                <img
                  src={pokemon.picture}
                  alt={pokemon.name}
                  style={{ width: "250px", margin: "0 auto" }}
                />
                <span className="btn-floating halfway-fab waves-effect waves-light">
                  <i onClick={deletePokemon} className="material-icons">
                    delete
                  </i>
                </span>
              </div>
            )}
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon Picture */}
                {/* {!isEditForm && ( */}
                  <div className="form-group">
                    <label htmlFor="img">Image</label>
                    <input
                      id="picture"
                      type="text"
                      className="form-control"
                      name="picture"
                      onChange={(e) => handleInputChange(e)}
                      value={form.picture.value}
                    ></input>
                    {form.picture.error && (
                      <div className="card-panel red accent-1">
                        {form.picture.error}
                      </div>
                    )}
                  </div>
                {/* )} */}
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={(e) => handleInputChange(e)}
                    value={form.name.value}
                  ></input>
                  {form.name.error && (
                    <div className="card-panel red accent-1">
                      {form.name.error}
                    </div>
                  )}
                </div>
                
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input
                    id="hp"
                    type="number"
                    className="form-control"
                    value={form.hp.value}
                    name="hp"
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.hp.error && (
                    <div className="card-panel red accent-1">
                      {form.hp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input
                    id="cp"
                    type="number"
                    className="form-control"
                    value={form.cp.value}
                    name="cp"
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.cp.error && (
                    <div className="card-panel red accent-1">
                      {form.cp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map((type) => (
                    <div key={type} style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          id={type}
                          type="checkbox"
                          className="filled-in"
                          value={type}
                          checked={hasType(type)}
                          // name='hp'
                          onChange={(e) => handleCheckChange(e)}
                          disabled={!isTypesValid(type)}
                        ></input>
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="btn"
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;

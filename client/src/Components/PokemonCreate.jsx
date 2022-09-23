import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postPoke, getTypes } from "../Actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import "../Hojas-Estilo/PokemonCreate.css";

export default function CreatePoke() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTypes = useSelector((state) => state.pokemonsTypes);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    height: 50,
    weight: 50,
    types: [],
    sprites: "",
  });

  function validation(input) {
    let errors = {};
    if (!input.name || typeof input.name !== "string") {
      errors.name = "¿Cómo deberíamos llamar a este Pokémon?";
    } else if (
      !input.hp ||
      input.hp > 100 ||
      input.hp < 0 ||
      typeof input.hp !== "number"
    ) {
      errors.hp = 'Por favor inserte un número de "HEALTH" válido de 0 a 100';
    } else if (
      !input.attack ||
      input.attack > 100 ||
      input.attack < 0 ||
      typeof input.attack !== "number"
    ) {
      errors.attack =
        'Por favor inserte un número de "ATTACK" válido de 0 a 100';
    } else if (
      !input.defense ||
      input.defense > 100 ||
      input.defense < 0 ||
      typeof input.defense !== "number"
    ) {
      errors.defense =
        'Por favor inserte un número de "DEFENSE" válido de 0 a 100';
    } else if (
      !input.speed ||
      input.speed > 100 ||
      input.speed < 0 ||
      typeof input.speed !== "number"
    ) {
      errors.speed = 'Por favor inserte un número de "SPEED" válido de 0 a 100';
    } else if (
      !input.height ||
      input.height > 100 ||
      input.height < 0 ||
      typeof input.height !== "number"
    ) {
      errors.height =
        'Por favor inserte un número de "HEIGHT" válido de 0 a 100';
    } else if (
      !input.weight ||
      input.weight > 100 ||
      input.weight < 0 ||
      typeof input.weight !== "number"
    ) {
      errors.weight =
        'Por favor inserte un número de "WEIGHT" válido de 0 a 100';
    } else if (!input.types) {
      errors.types = 'Elige de 1 a 3 "TYPES"';
    } else if (!input.sprites || typeof input.sprites !== "string") {
      errors.sprites = "Por favor, inserte una URL de imagen válida";
    }
    return errors;
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }

  function handleSubmit(e) {
    if (!input.name) {
      e.preventDefault();
      return alert("Es necesario ingresar un nombre para crear un Pokemon");
    } else if (!input.types.length) {
      e.preventDefault();
      return alert("Selecciona al menos un tipo de Pokemon");
    } else if (!input.sprites) {
      e.preventDefault();
      return alert("Por favor, inserte una URL de imagen válida");
    }
    dispatch(postPoke(input));
    alert("Pokemon creado con Exito!");
    setInput({
      name: "",
      hp: 50,
      attack: 50,
      defense: 50,
      speed: 50,
      height: 50,
      weight: 50,
      types: [],
      img: "",
    });
    navigate("/");
  }

  let handleDelete = (type) => {
    setInput({
      ...input,
      types: input.types.filter((el) => el !== type),
    });
  };

  return (
    <div className="formDiv">
      <NavBar />
      <div className="submit-title">
        <h2 className="titleCreate">Crear Pokemon:</h2>
        <h3 className="titleCreate">
          Crear:
          <button
            id="submit"
            className="titleCreate"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          />
        </h3>
      </div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="createLeft">
          <div className="range">
            <label className="createText">HP:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="1"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
            />
            <h5 className="createText">{input.hp}</h5>
            {errors.name && <span className="errors">{errors.hp}</span>}
          </div>
          <br />
          <div className="range">
            <label className="createText">Attack:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="2"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
            <h5 className="createText">{input.attack}</h5>
            {errors.name && <span className="errors">{errors.attack}</span>}
          </div>
          <br />
          <div className="range">
            <label className="createText">Defense:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="3"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
            <h5 className="createText">{input.defense}</h5>
            {errors.name && <span className="errors">{errors.defense}</span>}
          </div>
        </div>

        <div className="center">
          <div className="range">
            <label className="createText">Speed:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="4"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
            <h5 className="createText">{input.speed}</h5>
            {errors.name && <span className="errors">{errors.speed}</span>}
          </div>
          <br />
          <div className="range">
            <label className="createText">Height:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="5"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
            <h5 className="createText">{input.height}</h5>
            {errors.name && <span className="errors">{errors.height}</span>}
          </div>
          <br />
          <div className="range">
            <label className="createText">Weight:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="6"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
            <h5 className="createText">{input.weight}</h5>
            {errors.name && <span className="errors">{errors.weight}</span>}
          </div>
        </div>
        <div className="createRight">
          <div>
            <label className="createText">Name:</label>
            <input
              type="text"
              id="7"
              value={input.name}
              name="name"
              placeholder="PokeName"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="errors">{errors.name}</p>}
          </div>

          <div>
            <label className="createText">Select Types:</label>
            <select id="8" onChange={(e) => handleSelect(e)}>
              <option value="" hidden name="types">
                Select Types:
              </option>
              {allTypes?.map((pt) => {
                return (
                  <option value={pt.name} key={pt.id}>
                    {pt.name}
                  </option>
                );
              })}
            </select>
            <ul>
              <li>
                {input.types.map((pt) => (
                  <div>
                    <h5 className="createText">
                      {allTypes?.find((p) => p.name === pt)?.name}
                      <button
                        className="deleteType"
                        onClick={() => handleDelete(pt)}
                      >
                        X
                      </button>
                    </h5>
                  </div>
                ))}
              </li>
            </ul>
            {errors.types && <span className="errors">{errors.types}</span>}
          </div>

          <div>
            <label className="createText">Image:</label>
            <input
              type="url"
              id="9"
              value={input.sprites}
              name="img"
              placeholder="Image Url..."
              onChange={(e) => handleChange(e)}
            />
            {errors.sprites && <span className="errors">{errors.sprites}</span>}
          </div>
        </div>
      </form>
    </div>
  );
}

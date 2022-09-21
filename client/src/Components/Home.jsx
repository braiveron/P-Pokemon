import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../Actions";
import { Link } from "react-router-dom";
import loading from "../PokeImagenes/loading.gif";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <div>
      <Link to="/pokemons">Crear Nuevo Pokemon</Link>
      <h1>Aguante Pokemon</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar los pokemons
      </button>
      <div>
        {/* filtro para ordenar asc o desc por orden alfabetico */}
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        {/* filtro por tipo */}
        <select>
          <option value="All">Todos</option>
          <option value="Fairy">Fairy</option>
          <option value="Dark">Dark</option>
          <option value="Dragon">Dragon</option>
          <option value="Flying">Flying</option>
          <option value="Ghost">Ghost</option>
          <option value="Grass">Grass</option>
          <option value="Normal">Normal</option>
          <option value="Poison">Poison</option>
          <option value="Psychic">Psychic</option>
          <option value="Electric">Electric</option>
          <option value="Ice">Ice</option>
          <option value="Bug">Bug</option>
          <option value="Fire">Fire</option>
          <option value="Ground">Ground</option>
          <option value="Rock">Rock</option>
        </select>
        {/* filtro por creado por nosotros o existente*/}
        <select>
          <option value="All">Todos</option>
          <option value="api">Existente</option>
          <option value="created">Creados</option>
        </select>
        {/* filtro por ataque*/}
        <select>
          <option value="All">Todos</option>
        </select>
      </div>
      <div>
        {allPokemons?.map((p) => {
          return (
            <fragment>
              <Link to={"/home/" + p.id}>
                <Card
                  id={p.id}
                  name={p.name}
                  hp={p.hp}
                  attack={p.attack}
                  defense={p.defense}
                  speed={p.speed}
                  height={p.height}
                  weight={p.weight}
                  image={p.image}
                  types={p.types}
                />
              </Link>
            </fragment>
          );
        })}
        <div>
          <p className="loading">Loading Pokemons...</p>

          <img src={loading} alt="loading.gif" width="200px" height="200px" />
        </div>
      </div>
    </div>
  );
}

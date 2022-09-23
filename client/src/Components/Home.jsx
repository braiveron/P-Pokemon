import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  reload,
  orderByAbc,
  filterByType,
  orderByStrength,
  filterApi,
} from "../Actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import NavBar from "./NavBar";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import loading from "../PokeImagenes/loading.gif";
import "../Hojas-Estilo/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.pokemonTypes);

  const [current, setCurrent] = useState(1);
  const [pokemonsPage, setPokemonsPage] = useState(12);
  const [order, setOrder] = useState("");
  const ultimoPoke = current * pokemonsPage;
  const primerPoke = ultimoPoke - pokemonsPage;
  const pokes = allPokemons.slice(primerPoke, ultimoPoke);

  const paginado = (pages) => {
    setCurrent(pages);
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleReload(e) {
    e.preventDefault();
    dispatch(reload(e));
  }

  function handleOrderByAbc(e) {
    e.preventDefault();
    dispatch(orderByAbc(e.target.value));
    setCurrent(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
  }

  function handleOrderByStrength(e) {
    e.preventDefault();
    dispatch(orderByStrength(e.target.value));
    setCurrent(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterApi(e) {
    dispatch(filterApi(e.target.value));
  }

  return (
    <div className="container">
      <div className="navBar">
        <NavBar />
      </div>

      <div className="izquierda">
        <SearchBar className="searchBar" />
        <h4 className="text">
          Crear Pokemon:
          <Link to="/pokemons">
            <button className="create" />
          </Link>
        </h4>
        <Paginado
          className="paginado"
          pokemonsPage={pokemonsPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
        <div className="filters">
          <select className="abcFilter" onChange={(e) => handleOrderByAbc(e)}>
            <option value="All">Orden Alfabetico</option>
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
          <br />
          <select className="typesFilter" onChange={(e) => handleFilterType(e)}>
            <option value="All">Tipos de Pokemon</option>
            {allTypes?.map((t) => {
              return (
                <option value={t.name} key={t.id}>
                  {t.name}
                </option>
              );
            })}
          </select>
          <br />
          <select
            className="strengthFilter"
            onChange={(e) => handleOrderByStrength(e)}
          >
            <option value="All">Fuerza</option>
            <option value="powerfull">Poder</option>
            <option value="weak">Debil</option>
          </select>
          <br />
          <select className="apiFiltrer" onChange={(e) => handleFilterApi(e)}>
            <option value="All">Existente o Creado</option>
            <option value="api">Existente</option>
            <option value="db">Creados</option>
          </select>
          <br />
          <h4 className="text">
            Recargar Pokemons:
            <button className="reload" onClick={(e) => handleReload(e)} />
          </h4>
        </div>
      </div>

      <div className="cards">
        {pokes.length > 0 ? (
          pokes.map((p) => {
            return (
              <Card
                id={p.id}
                name={p.name}
                hp={p.hp}
                attack={p.attack}
                defense={p.defense}
                speed={p.speed}
                height={p.height}
                weight={p.weight}
                img={p.img}
                types={p.types}
              />
            );
          })
        ) : (
          <div>
            <p className="loading">Esperando Pokemons...</p>
            <img src={loading} alt="loading.gif" width="700px" height="250px" />
          </div>
        )}
      </div>
    </div>
  );
}

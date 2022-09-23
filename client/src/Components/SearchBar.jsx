import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon } from "../Actions/index";
import "../Hojas-Estilo/SearchBar.css";

export default function Search() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSearchBar = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    dispatch(getPokemon(name));
  };

  return (
    <div>
      <input
        className="inputSearch"
        type="text"
        placeholder="Buscar Pokemons..."
        onChange={(e) => handleSearchBar(e)}
      />
      <button
        className="searchPoke"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      ></button>
    </div>
  );
}

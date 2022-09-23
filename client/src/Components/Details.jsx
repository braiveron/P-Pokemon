import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../Actions";
import NavBar from "./NavBar";
import loading from "../PokeImagenes/loading.gif";
import "../Hojas-Estilo/Details.css";

export default function Detail() {
  const dispatch = useDispatch();
  const pokeId = useParams();
  let pokemon = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(getDetails(pokeId.id));
  }, [dispatch]);

  return (
    <div className="detailsBackground">
      <NavBar />
      {pokemon.length === 0 ? (
        <div>
          <p className="sinPoke"> Loading...</p>
          <img src={loading} alt="Not Poke" height="450px" width="950px" />
        </div>
      ) : (
        <div className="detailPokemon">
          <div className="detailsLeft">
            <h3>Health Power: {pokemon.hp}</h3>
            <h3>Attack: {pokemon.attack} </h3>
            <h3>Defense: {pokemon.defense}</h3>
            <h3>Speed: {pokemon.speed}</h3>
            <h3>ID: {pokemon.id}</h3>
          </div>
          <div className="detailsCenter">
            <h1 className="pokename">Pokemon: {pokemon.name.toUpperCase()}</h1>
            <img
              className="pokeimg"
              src={pokemon.sprites}
              alt="Pokemon"
              height="350px"
              width="350px"
            />
          </div>
          <div className="detailsRight">
            <h3>Height: {pokemon.height}</h3>
            <h3>Weight: {pokemon.weight}</h3>
            <h3>
              Types:{" "}
              {pokemon.types.map((el) => (
                <li>{el.name.toUpperCase()}</li>
              ))}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

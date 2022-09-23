import React from "react";
import { Link } from "react-router-dom";
import "../Hojas-Estilo/Card.css";

export default function Card({ id, sprites, name, types }) {
  return (
    <div className="Card">
      <h3 className="pokemon">Pokemon: {name}</h3>

      <Link to={"/pokemons/" + id}>
        <img src={sprites} alt="Not Found" width="200px" height="250px" />
      </Link>
      <h3 className="types">
        Types: {types.map((el) => "- " + el.name + " ")}
      </h3>
      <br />
    </div>
  );
}

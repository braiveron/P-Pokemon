import React from "react";

export default function Card({ name, image, types }) {
  return (
    <div className="Card">
      <h3 className="pokemon">Pokemon: {name}</h3>
      <h3 className="types">
        Types: {types.map((el) => "- " + el.name + " ")}
      </h3>
      <img src={image} alt="Not Found" width="200px" height="250px" />
    </div>
  );
}

import React from "react";
import "../Hojas-Estilo/Paginado.css";

export default function Paginado({ pokemonsPage, allPokemons, paginado }) {
  const pages = [];
  for (let i = 1; i < Math.ceil(allPokemons / pokemonsPage); i++) {
    pages.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pages &&
          pages.map((n) => (
            <li key={n}>
              <button className="pageNumber" onClick={() => paginado(n)}>
                {n}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}

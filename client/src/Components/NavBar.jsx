import React from "react";
import { Link } from "react-router-dom";
import "../Hojas-Estilo/NavBar.css";

export default function NavBar() {
  return (
    <Link className="title" to="/home">
      <button className="pokeball"></button>
    </Link>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "../Hojas-Estilo/LandingPage.css";

/* export default function LandingPage() {
  return (
    <div className="backgroun">
      <div className="container">
      <h1>Bienvenidos a mi super pagina</h1>
      <Link to="/home">
        <button className="button">Ingresar</button>
      </Link>
      </div>
    </div>
  );
} */

export default function LandingPage() {
  return (
    <div className="background">
      <div className="container">
        <h4 className="Text">Dev by Braian Veron</h4>
        <Link to="/home">
          <button className="button">Ingresar</button>
        </Link>
      </div>
    </div>
  );
}

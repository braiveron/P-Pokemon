import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    var pokes = await axios.get("https://localhost:3001/pokemons");
    return dispatch({
      type: "GET_ POKEMONS",
      payload: pokes.data,
    });
  };
}

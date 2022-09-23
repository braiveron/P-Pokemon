import axios from "axios";
import {
  RUTA_GET,
  RUTA_TYPES,
  GET_DETAILS,
  GET_POKEMON,
  GET_POKEMONS,
  GET_TYPES,
  ORDER_BY_ABC,
  ORDER_BY_STRENGTH,
  FILTER_API,
  FILTER_BY_TYPE,
  RELOAD,
} from "./const";

export function getPokemons() {
  return async (dispatch) => {
    let pokes = await axios.get(RUTA_GET);
    return dispatch({
      type: GET_POKEMONS,
      payload: pokes.data,
    });
  };
}

export function getPokemon(payload) {
  return {
    type: GET_POKEMON,
    payload,
  };
}

export function getTypes() {
  return async (dispatch) => {
    let types = await axios.get(RUTA_TYPES);
    return dispatch({
      type: GET_TYPES,
      payload: types.data,
    });
  };
}

export function getDetails(id) {
  return async (dispatch) => {
    try {
      let pokemon = await axios.get(`${RUTA_GET}'/'${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: pokemon.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function postPoke(payload) {
  return async (dispatch) => {
    const pokeCreate = await axios.post(RUTA_GET, payload);
    return pokeCreate;
  };
}

export function reload(payload) {
  return {
    type: RELOAD,
    payload,
  };
}

export function orderByAbc(payload) {
  return {
    type: ORDER_BY_ABC,
    payload,
  };
}

export function filterByType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
}

export function orderByStrength(payload) {
  return {
    type: ORDER_BY_STRENGTH,
    payload,
  };
}

export function filterApi(payload) {
  return {
    type: FILTER_API,
    payload,
  };
}

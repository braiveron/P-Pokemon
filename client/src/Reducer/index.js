import {
  GET_DETAILS,
  GET_POKEMON,
  GET_POKEMONS,
  GET_TYPES,
  ORDER_BY_ABC,
  ORDER_BY_STRENGTH,
  FILTER_API,
  FILTER_BY_TYPE,
  RELOAD,
} from "../Actions/const";

const initialState = {
  pokemon: [],
  pokemons: [],
  pokemonsFilter: [],
  pokemonTypes: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsFilter: action.payload,
      };
    case GET_POKEMON:
      let allPokemons = state.pokemonsFilter;
      let onePokemon = allPokemons.filter((p) => p.name === action.payload);
      let sinPokemon = allPokemons;
      return {
        ...state,
        pokemons: onePokemon.length
          ? onePokemon
          : sinPokemon.concat(
              alert(
                "No hay pokemon con ese nombre. Déjame mostrarte todos los pokemons:"
              )
            ),
      };
    case GET_TYPES:
      return {
        ...state,
        pokemonTypes: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        pokemon: action.payload,
      };
    case RELOAD:
      return {
        ...state,
        pokemons: state.pokemonsFilter,
      };
    case ORDER_BY_ABC:
      let pokemonsOrder =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: pokemonsOrder,
      };
    case FILTER_BY_TYPE:
      const allPokes = state.pokemonsFilter;
      const typeFilter =
        action.payload === "all"
          ? allPokes
          : allPokes.filter((el) =>
              el.types.map((el) => el.name).includes(action.payload)
            );
      return {
        ...state,
        pokemons: typeFilter,
      };
    case ORDER_BY_STRENGTH:
      let pokemonStrength =
        action.payload === "weak"
          ? state.pokemons.sort((a, z) => {
              if (a.attack > z.attack) {
                return 1;
              }
              if (z.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, z) => {
              if (a.attack > z.attack) {
                return -1;
              }
              if (a.attack > z.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: pokemonStrength,
      };
    case FILTER_API:
      let pokes = [];
      if (action.payload === "pokes") {
        pokes = state.pokemonsFilter;
      } else if (action.payload === "db") {
        pokes = state.pokemonsFilter.filter((p) => p.create);
      } else if (action.payload === "api") {
        pokes = state.pokemonsFilter.filter((p) => !p.create);
      }
      return {
        ...state,
        pokemons: pokes,
      };
    case "POST_POKE":
      return {
        ...state,
        pokemons: pokes,
      };
    default:
      return state;
  }
}

export default rootReducer;

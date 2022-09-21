const { Router, query } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../../db");
const router = Router();

// traigo info de la api
const getApiInfo = async () => {
  const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon");
  // const 'apiNext' accede a la propiedad next en la segunda pagina de la api con +20 pokemons y acceder a su info.
  const apiNext = await axios.get(apiUrl.data.next);
  // concatenamos los primeros 20 pokemons a los 20 siguientes
  const infoTotal = apiUrl.data.results.concat(apiNext.data.results);
  // mapear cada pokemon para obtener su url
  const pokeUrl = infoTotal.map((el) => {
    return el.url;
  });
  const arrayPokemons = [];
  // creo un array donde agrego solo los datos solicitados
  for (let i = 0; i < pokeUrl.length; i++) {
    const url = await axios(pokeUrl[i]);
    arrayPokemons.push({
      id: url.data.id,
      name: url.data.name,
      hp: url.data.stats[0]["base_stat"],
      attack: url.data.stats[1]["base_stat"],
      defense: url.data.stats[2]["base_stat"],
      speed: url.data.stats[5]["base_stat"],
      height: url.data.height,
      weight: url.data.weight,
      sprites: url.data.sprites.other.home.front_defautl,
      types: url.data.types.map((t) => t.type.name),
    });
  }
  return arrayPokemons;
};

//traigo info de la base de datos
const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

// Unifico info de api con info de db
const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

module.exports = { getAllPokemons, getApiInfo, getDbInfo };

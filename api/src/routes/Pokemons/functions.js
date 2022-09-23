const { Router, query } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../../db");
const router = Router();

// traigo info de la api
const getApiInfo = async () => {
  let pokeSaver = [];
  const urlPoke = await axios.get("https://pokeapi.co/api/v2/pokemon");
  let pokeData = urlPoke.data.results.map((p) => axios.get(p.url));
  const urlPoke2 = await axios.get(urlPoke.data.next);
  let pokeData2 = urlPoke2.data.results.map((p) => axios.get(p.url));

  let allPokes = pokeData.concat(pokeData2);

  let pokeResults = await axios.all(allPokes).then((poke) => {
    poke.map((p) => {
      pokeSaver.push({
        id: p.data.id,
        name: p.data.name,
        hp: p.data.stats[0].base_stat,
        attack: p.data.stats[1].base_stat,
        defense: p.data.stats[2].base_stat,
        speed: p.data.stats[5].base_stat,
        height: p.data.height,
        weight: p.data.weight,
        types: p.data.types.map((pt) => pt.type),
        sprites: p.data.sprites.other.home.front_default,
        db: false,
      });
    });
    return pokeSaver;
  });
  return pokeResults;
};

//traigo info de la base de datos
const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
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

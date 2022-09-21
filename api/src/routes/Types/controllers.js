const axios = require("axios");
const { Type } = require("../../db");

const getTypes = async (req, res, next) => {
  //traigo info de la api
  let typesApi = await axios.get("https://pokeapi.co/api/v2/type");
  // filtro por nombre de cada tipo de pokemon
  let typesApi2 = typesApi.data.results.map((el) => el.name);
  // mapeo y ordeno
  /*  typesApi2 = typesApi2
    .map((el) => el.name)
    .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1)); */
  // agrego a mi db cada uno de los tipos de pokemon, si ya existe no lo crea
  typesApi2.forEach((el) => {
    Type.findOrCreate({
      where: { name: el },
    });
  });
  const allTypes = await Type.findAll();
  res.json(allTypes);
};

module.exports = { getTypes };

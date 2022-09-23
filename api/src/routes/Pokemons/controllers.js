const axios = require("axios");
const { Pokemon, Type } = require("../../db");
const { getAllPokemons } = require("./functions");

const getPoke = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      const allPokes = await nameSearch();
      const poke = allPokes.find((p) => p.name === name);
      if (poke) return res.status(200).json(poke);
      return res.status(404).send("There is no pokemon with that name");
    } else {
      const allPokes = await getAllPokemons();
      return res.status(200).json(allPokes);
    }
  } catch (error) {
    next(error);
  }
};

const createPoke = async (req, res, next) => {
  try {
    //traigo la info por body
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      sprites,
      create,
      types,
    } = req.body;
    //creo nuevo Pokemon con la info solicitada
    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      sprites,
      create,
    });
    // busco en db el tipo de Pokemon
    const typeDb = await Type.findAll({
      where: { name: types },
    });
    console.log(typeDb);
    // al Pokemon creado le agrego el tipo encontrado
    await newPokemon.addType(typeDb);

    res.send("Pokemon creado con exito");
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    // traigo info por params
    const { id } = req.params;
    const pokemonsTotal = await getAllPokemons();
    // si tengo id en la ruta y lo encuentro en db lo devuelvo
    if (id) {
      let pokemonID = pokemonsTotal.filter((el) => el.id == id);
      pokemonID.length
        ? res.status(200).send(pokemonID)
        : res.status(404).send("No se encontro ese Pokemon");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getPoke,
  createPoke,
  getById,
};

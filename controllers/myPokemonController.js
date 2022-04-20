"use strict";
const axios = require("axios");
const { MyPokemon } = require("../models/index");

module.exports = class Controller {
  static async get(req, res, next) {
    try {
      const myPokemons = await MyPokemon.findAll({
        where: { UserId: req.user.id },
      });
      for (const i in myPokemons) {
        const url = `https://pokeapi.co/api/v2/pokemon/${myPokemons[i].PokemonId}`;
        const { data } = await axios.get(url);
        const pokemonDetail = {
          id: myPokemons[i].PokemonId,
          url,
          name: data.name,
          imageUrl: data.sprites.other["official-artwork"].front_default,
          types: data.types.map((type) => type.type.name),
          stats: data.stats.map((el) => el.base_stat),
        };
        myPokemons[i].dataValues.detail = pokemonDetail;
      }
      res.status(200).json(myPokemons);
    } catch (err) {
      next(err);
    }
  }

  static async add(req, res, next) {
    try {
      const { PokemonId } = req.params;
      const newPokemon = await MyPokemon.create({
        UserId: req.user.id,
        PokemonId,
      });
      res.status(201).json(newPokemon);
    } catch (err) {
      next(err);
    }
  }
};

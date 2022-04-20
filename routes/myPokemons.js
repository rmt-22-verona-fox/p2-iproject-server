"use strict";
const router = require("express").Router();
const MyPokemon = require("../controllers/myPokemonController");

router.get("/", MyPokemon.get);
router.post("/:PokemonId", MyPokemon.add);

module.exports = router;

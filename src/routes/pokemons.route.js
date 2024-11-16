import express from "express";
import PokemonController from "../controllers/pokemon.controller";

const PokemonRoutes = express.Router();

PokemonRoutes.get("/", PokemonController.getAllPokemons);

export default PokemonRoutes;

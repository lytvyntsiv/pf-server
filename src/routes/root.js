import express from "express";
import PokemonRoutes from "./pokemons.route";
import AuthRoutes from "./auth.route";
import { authMiddleware } from "../middleware/auth.middleware";

const root = express.Router();

root.use("/pokemon", authMiddleware, PokemonRoutes);
root.use("/auth", AuthRoutes);

export default root;

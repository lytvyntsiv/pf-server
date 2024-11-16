import fs from "fs";
import path from "path";
import Pokemon from "../models/pokemon.schema";

const loadData = () => {
  const dataPath = path.join(__dirname, "../seeds/pokemons.json");
  const data = fs.readFileSync(dataPath, "utf-8");

  return JSON.parse(data);
};

const seedPokemons = async () => {
  try {
    const existingData = await Pokemon.countDocuments();

    if (existingData > 0) {
      return;
    }

    const pokemonData = loadData();

    await Pokemon.insertMany(pokemonData);
  } catch (error) {
    console.log(error);
  }
};

export default seedPokemons;

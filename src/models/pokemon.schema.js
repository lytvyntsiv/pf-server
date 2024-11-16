import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  pokemon_id: { type: Number, required: true, unique: true },
  name: {
    english: String,
    japanese: String,
    chinese: String,
    french: String,
  },
  type: [String],
  base: {
    HP: Number,
    Attack: Number,
    Defense: Number,
    "Sp. Attack": Number,
    "Sp. Defense": Number,
    Speed: Number,
  },
  species: String,
  description: String,
  evolution: {
    prev: [String],
  },
  profile: {
    height: String,
    weight: String,
    egg: [String],
    ability: [[String, String]],
    gender: String,
  },
  image: {
    sprite: String,
    thumbnail: String,
    hires: String,
  },
});

const Pokemon = mongoose.model("pokemon", pokemonSchema);

export default Pokemon;

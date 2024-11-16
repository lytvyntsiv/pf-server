import mongoose from "mongoose";
import { ATTACKER_TYPE } from "../constants";
import User from "./user.schema";

const battleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name,
  },
  user_pokemon_id: { type: Number, required: true },
  computer_pokemon_id: { type: Number, required: true },
  winner: {
    type: String,
    enum: [ATTACKER_TYPE.USER, ATTACKER_TYPE.COMPUTER],
  },
});

const Battle = mongoose.model("battle", battleSchema);

export default Battle;

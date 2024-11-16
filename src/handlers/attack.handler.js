import Pokemon from "../models/pokemon.schema";
import User from "../models/user.schema";
import socketClient from "../helpers/connection/socketClient";
import { calculateDamage } from "../helpers/calculateDamage";
import { ATTACKER_TYPE, WS_EVENTS_TYPES } from "../constants";
import { sleep } from "../helpers/sleep";
import { Types } from "mongoose";
import { endGameHandler } from "./end-game.handler";

const attackHandler = async (ws, data, attacker_type) => {
  const { attacker, defender, playerHP, computerHP, user_id: userId } = data;

  const [attackerPokemon, defenderPokemon, user] = await Promise.all([
    Pokemon.findOne({ pokemon_id: attacker.pokemon_id }).lean(),
    Pokemon.findOne({ pokemon_id: defender.pokemon_id }).lean(),
    User.findById(new Types.ObjectId(userId)).lean(),
  ]);

  attackerPokemon.level =
    attacker_type === ATTACKER_TYPE.COMPUTER
      ? user.computerLevel
      : user.userLevel;

  const damage = calculateDamage(attackerPokemon, defenderPokemon);
  const isPlayerDefeated =
    attacker_type === ATTACKER_TYPE.COMPUTER && playerHP - damage <= 0;
  const isComputerDefeated =
    attacker_type === ATTACKER_TYPE.USER && computerHP - damage <= 0;

  socketClient.sendMessageToClient(userId, {
    type: WS_EVENTS_TYPES.BATTLE_UPDATE,
    data: {
      damage,
      attacker_type,
      log:
        attacker_type === ATTACKER_TYPE.COMPUTER
          ? `The computer's Pokémon, ${attackerPokemon.name.english}, attacked and dealt ${damage} damage.`
          : `Your Pokémon, ${attackerPokemon.name.english}, attacked and dealt ${damage} damage.`,
    },
  });

  const isEndGame = await endGameHandler(
    userId,
    attacker_type,
    isPlayerDefeated,
    isComputerDefeated,
    attackerPokemon,
    defenderPokemon,
    damage,
  );

  if (isEndGame) {
    return;
  }

  if (attacker_type === ATTACKER_TYPE.USER) {
    await sleep(2000);
    await attackHandler(ws, data, ATTACKER_TYPE.COMPUTER);
  }
};

export default attackHandler;

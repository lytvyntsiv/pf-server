import { ATTACKER_TYPE, WS_EVENTS_TYPES } from "../constants";
import Battle from "../models/battle.schema";
import User from "../models/user.schema";
import socketClient from "../helpers/connection/socketClient";

export const endGameHandler = async (
  userId,
  attacker_type,
  isPlayerDefeated,
  isComputerDefeated,
  attackerPokemon,
  defenderPokemon,
  damage,
) => {
  if (!isPlayerDefeated && !isComputerDefeated) return false;

  const winner = isPlayerDefeated ? ATTACKER_TYPE.COMPUTER : ATTACKER_TYPE.USER;

  const battle = new Battle({
    user_id: userId,
    user_pokemon_id:
      attacker_type === ATTACKER_TYPE.USER
        ? attackerPokemon.pokemon_id
        : defenderPokemon.pokemon_id,
    computer_pokemon_id:
      attacker_type === ATTACKER_TYPE.USER
        ? defenderPokemon.pokemon_id
        : attackerPokemon.pokemon_id,
    winner,
  });

  await battle.save();

  const user = await User.findById(userId);

  if (user) {
    if (user.userLevel < 10) {
      user.userLevel += 1;
    }
    if (user.computerLevel < 10 && user.userLevel - user.computerLevel >= 3) {
      user.computerLevel += 1;
    }
    await user.save();
  }

  socketClient.sendMessageToClient(userId, {
    type: WS_EVENTS_TYPES.BATTLE_UPDATE,
    data: {
      damage,
      attacker_type,
      end_game: true,
      log: isPlayerDefeated
        ? "End Game, Computer win :("
        : "End Game, You win !!!",
    },
  });

  return true;
};

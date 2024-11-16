import Pokemon from "../models/pokemon.schema";
import attackHandler from "./attack.handler";
import { sleep } from "../helpers/sleep";
import socketClient from "../helpers/connection/socketClient";
import { ATTACKER_TYPE, WS_EVENTS_TYPES } from "../constants";

const startGameHandler = async (ws, data) => {
  try {
    const { pokemon: playerPokemon, user_id: userId } = data;

    const pokemon = await Pokemon.aggregate([
      { $match: { pokemon_id: { $ne: playerPokemon.pokemon_id } } },
      { $sample: { size: 1 } },
    ]);
    const randomPokemon = pokemon[0];

    const firstTurn =
      playerPokemon.base.Speed > randomPokemon.base.Speed
        ? ATTACKER_TYPE.USER
        : ATTACKER_TYPE.COMPUTER;

    const message = {
      type: WS_EVENTS_TYPES.START_GAME,
      data: {
        pokemon: randomPokemon,
        firstTurn,
      },
    };

    socketClient.sendMessageToClient(userId, message);

    if (firstTurn === ATTACKER_TYPE.COMPUTER) {
      await sleep(2000);
      await attackHandler(
        ws,
        {
          user_id: userId,
          attacker: randomPokemon,
          defender: playerPokemon,
        },
        ATTACKER_TYPE.COMPUTER,
      );
    }
  } catch (err) {
    ws.send(JSON.stringify({ type: "error", message: "Failed to start game" }));
  }
};

export default startGameHandler;

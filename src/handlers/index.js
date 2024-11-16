import attackHandler from "./attack.handler";
import startGameHandler from "./start-game.handler";
import { ATTACKER_TYPE, WS_EVENTS_TYPES } from "../constants";
import connectHandler from "./connect.hanler";
import { validateWsMessage } from "../validators";
import {
  attackSchema,
  connectSchema,
  startGameSchema,
} from "../validators/ws.validator";

const eventsHandlers = async (message, ws) => {
  const parsedMessage =
    message instanceof Buffer ? message.toString() : message;

  const parsedData = JSON.parse(parsedMessage);

  switch (parsedData.type) {
    case WS_EVENTS_TYPES.CONNECT:
      validateWsMessage(connectSchema, parsedData.data);
      await connectHandler(ws, parsedData.data);
      break;

    case WS_EVENTS_TYPES.START_GAME:
      validateWsMessage(startGameSchema, parsedData.data);
      await startGameHandler(ws, parsedData.data);
      break;

    case WS_EVENTS_TYPES.ATTACK:
      validateWsMessage(attackSchema, parsedData.data);
      await attackHandler(ws, parsedData.data, ATTACKER_TYPE.USER);
      break;

    default:
      console.error(`Websocket message with type ${parsedData.type} not exist`);
  }
};

export default eventsHandlers;

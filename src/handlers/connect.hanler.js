import socketClient from "../helpers/connection/socketClient";

const connectHandler = async (ws, data) => {
  const { user_id: userId } = data;
  socketClient.connectClient(userId, ws);
};

export default connectHandler;

import { WebSocketServer } from "ws";

class SocketClient {
  constructor() {
    this.ws = null;
    this.clients = new Map();
  }

  connect(dispatchEventsHandler) {
    if (this.ws) {
      return this.ws;
    }

    this.ws = new WebSocketServer({ port: 3005 });

    this.ws.on("connection", (ws) => {
      ws.on("message", (message) => {
        dispatchEventsHandler(message, ws);
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });

      ws.on("error", (e) => {
        console.error("WebSocket error:", e);
      });
    });

    return this.ws;
  }

  connectClient(clientId, ws) {
    this.clients.set(clientId, ws);
  }

  sendMessageToClient(clientId, message) {
    const client = this.clients.get(clientId);
    if (client && client.readyState === client.OPEN) {
      const parsedMessage = JSON.stringify(message);
      client.send(parsedMessage);
    } else {
      console.error(`Client with clientId ${clientId} not connected`);
    }
  }
}

const socketClient = new SocketClient();

export default socketClient;

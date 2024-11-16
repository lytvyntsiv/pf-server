import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";
import SocketClient from "./helpers/connection/socketClient";
import MongoClient from "./helpers/connection/mongoClient";
import eventsHandlers from "./handlers";
import root from "./routes/root";
import errorHandler from "./middleware/errorHandler.middleware";
import seedPokemons from "./services/pokemonSeeder";


const app = express();

MongoClient.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
      origin: config.clientOrigins[config.nodeEnv],
    }),
);

app.use(helmet());
app.use(morgan("tiny"));

app.use("/", root);

app.use(errorHandler);

const server = app.listen(config.port, async () => {
  await seedPokemons();
  console.log(
    `🚀 Listening on ${config.port} with NODE_ENV=${config.nodeEnv} 🚀`,
  );
});

SocketClient.connect(eventsHandlers, server);

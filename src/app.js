import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";
import root from "./routes/root";
import errorHandler from "./middleware/errorHandler.middleware";
import MongoClient from "./helpers/connection/mongoClient";
import SocketClient from "./helpers/connection/socketClient";
import eventsHandlers from "./handlers";
import seedPokemons from "./services/pokemonSeeder";

const app = express();

MongoClient.connect();
SocketClient.connect(eventsHandlers);

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

seedPokemons();

export default app;

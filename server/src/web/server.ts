import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/error-handlers";
import routes from "./api";
import Logger from "../log/logger";
const logger = Logger.child({service: "http-server"});

process.on("uncaughtException", e => {
  logger.error(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  logger.error(e);
  process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3333 } = process.env;

let server;

export const init = () => {
  server = http.createServer(router);
  server.listen(PORT, () =>
      console.log(`Server is running http://localhost:${PORT}...`)
  );
};

import express from "express";
import { createServer } from "http";
import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport"
import { GameRoom } from "./rooms/GameRoom";
import cors from "cors";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const server = createServer(app);

const gameServer = new Server({
  greet: false,
  transport: new WebSocketTransport({
    server
  })
});

gameServer.define("game", GameRoom);
gameServer.listen(port);
import { MapSchema, Schema, type } from "@colyseus/schema";
import { Player } from "./Player";
import { ClassProperties } from "../types";

/** Game state properties type */
export type GameStateProperties = ClassProperties<GameState>;

/** Represents the game state in the server */
export class GameState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();

    getPlayers() {
        return Array.from(this.players.entries())
    }

    addPlayer(newPlayerId: Player['id']) {
        this.players.set(newPlayerId, new Player(newPlayerId));
    }

    removePlayer(playerId: Player['id']) {
        this.players.delete(playerId);
    }

    getPlayer(playerId: Player['id']) {
        return this.players.get(playerId);
    }

    hasPlayer(playerId: Player['id']) {
        return this.players.has(playerId);
    }
}
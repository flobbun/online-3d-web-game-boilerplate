import { EventTypes, GameState } from "@common";
import { Client, ClientArray, Room } from "colyseus";
import { Colors, colorize, log } from "../lib/log";

export class GameRoom extends Room<GameState> {

  /*±±±±± Lifecycle events ±±±±±*/

  onCreate() {
    this.setState(new GameState());

    this.onMessage(EventTypes.INCREASE_SCORE, (client) => this.onIncreaseScore(client, this.state));
  }

  onJoin({ sessionId }: Client) {
    this.state.addPlayer(sessionId);
    log(`Player ${sessionId} has joined`);
  }

  onLeave({ sessionId }: Client<this["clients"] extends ClientArray<infer U, any> ? U : never, this["clients"] extends ClientArray<infer _, infer U> ? U : never>, consented?: boolean): void | Promise<any> {
    this.state.removePlayer(sessionId);
    log(`Player ${sessionId} has left`);
  }

  /*±±±±± Custom events ±±±±±*/

  onIncreaseScore({ sessionId }: Client, state: GameState) {
    if (!state.hasPlayer(sessionId)) return;

    const player = state.getPlayer(sessionId);

    player.increaseScore();
    log(`Player ${sessionId} has increased score to ${colorize(player.score, Colors.YELLOW)}`);
  }
}
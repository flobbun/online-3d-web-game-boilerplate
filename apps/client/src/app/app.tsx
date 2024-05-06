import { useGameStore } from "../stores/game.store";
import { GAME_CONTAINER, GameConfig } from "../constants/game.config";
import { Game } from "phaser";
import useNetwork from "@hooks/useNetwork";
import { useEffect } from "react";
import { EventTypes } from "@common";

export function App() {
  new Game(GameConfig);

  return (
    <div id={GAME_CONTAINER}>
      <GameUI />
    </div>
  );
}

const GameUI = () => {
  const { room, players, unpackServerData } = useGameStore();
  const { joinOrCreateGame } = useNetwork();

  const increaseScore = () => {
    // We send a message to the server to increase the score
    room?.send(EventTypes.INCREASE_SCORE);
  }

  useEffect(() => {
    (async () => {
      // We create a new game room
      const room = await joinOrCreateGame("ABC");

      // And we subscribe to the state changes to update the store
      room.onStateChange((incomingState) => unpackServerData(room, incomingState));
    })();
  }, [joinOrCreateGame]);

  // We convert the players map to an array to render it
  const playersArr = Array.from(players.entries());

  return (
    <div className="flex justify-between p-2">
      <button onClick={increaseScore}>Click me (UI)</button>
      {
        playersArr && playersArr.length > 0 && (
          <div className="flex flex-col gap-y-2">
            <h1>Player scores:</h1>
              {playersArr.map(([id, player]) => (
                <div key={id}>
                  <p>Player {id} score: {player?.score}</p>
                </div>
              ))}
          </div>
        )
      }
    </div>
  )
}

export default App;

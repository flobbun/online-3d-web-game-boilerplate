import { EventTypes } from "@common";
import useNetwork from "@hooks/useNetwork";
import { Canvas, useFrame } from '@react-three/fiber';
import { FC, PropsWithRef, useEffect, useRef, useState } from "react";
import { useGameStore } from "../stores/game.store";
import { Text } from "@react-three/drei";

const Box: FC<PropsWithRef<any>> = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<any>()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export function App() {
  const { room } = useGameStore();

  return (
    <div className="h-screen">
      <GameUI />
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[5, 0, 0]} />
        <Text
          scale={[1, 1, 2]}
          color="black"
          anchorX="center"
          anchorY="middle"
          onClick={() => room?.send(EventTypes.INCREASE_SCORE)}
        >
          Click me (Game)
        </Text>
      </Canvas>
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

import { MapSchema } from "@colyseus/schema";
import { GameState, GameStateProperties } from "@common";
import { Room } from "colyseus.js";
import { create } from "zustand";

/** Networking properties from colyseus */
type NetworkingProperties = {
    room: Room<GameState> | null;
}

/** Networking utilities */
type NetworkingUtils = {
    /**  Unpacks the server data into the store */
    unpackServerData: (room: Room, incomingState: GameState) => void;
}

/** Game store type */
export type GameStore = GameStateProperties & NetworkingProperties & NetworkingUtils & {
    // Add custom store properties here
}

/** Game store */
export const useGameStore = create<GameStore>()((set) => ({
    unpackServerData: (room, incomingState) => set((state) => ({
        ...state,
        ...incomingState,
        room,
    })),

    // Networking properties (from colyseus)
    room: null,

    // Game state properties (from server)
    players: new MapSchema(),
}))
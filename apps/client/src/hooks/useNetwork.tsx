import { useCallback, useEffect, useState } from "react";
import { Client, Room } from 'colyseus.js';
import { GameState, Errors, Rooms } from "@common";

const useNetwork = () => {
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        setClient(new Client(import.meta.env.VITE_WS_SERVER_URL));
    }, []);

    /** * Joins a game room if it exists, otherwise creates a new one */
    const joinOrCreateGame = useCallback(async (roomId: string) => {
        const room = await client?.joinOrCreate(Rooms.GAME) as Room<GameState>;

        if (!room) {
            throw new Error(Errors.NO_ROOM_FOUND)
        }
        return room;
    }, [client]);

    /** * Joins to a specific game room */
    const joinGame = useCallback(async (roomId: string) => {
        const room = await client?.joinById(roomId) as Room<GameState>;

        if (!room) {
            throw new Error(Errors.NO_ROOM_FOUND)
        }
        return room;
    }, [client]);

    /** * Creates a new game room */
    const createGame = useCallback(async () => {
        const room = await client?.create(Rooms.GAME) as Room<GameState>;

        if (!room) {
            throw new Error(Errors.NO_ROOM_FOUND)
        }
        return room;
    }, [client]);

    return {
        client,
        joinGame,
        joinOrCreateGame,
        createGame,
    }
}

export default useNetwork
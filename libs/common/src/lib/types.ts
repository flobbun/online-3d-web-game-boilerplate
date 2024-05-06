export enum EventTypes {
    INCREASE_SCORE = "increase_score",
}

export enum Errors {
    NO_ROOM_FOUND = "No room found",
    CANVAS_CONTEXT_NOT_FOUND = "Canvas context not found",
    NO_PLAYER_FOUND = "No player found",
}

export enum Rooms {
    GAME = "game",
}

export type ClassProperties<C> = {
    [K in keyof C as C[K] extends Function ? never : K]: C[K]
}
import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    constructor(id: string) {
        super();
        this.id = id;
    }
    @type("string") id: string;
    @type("number") score: number = 0;

    increaseScore() {
        this.score++;
    }
}
// use deno to read file input.txt
import { readAll } from "https://deno.land/std@0.167.0/streams/read_all.ts";

const lut1 = { A: "rock", B: "paper", C: "scissors" } as const;
const lut2 = { X: "rock", Y: "paper", Z: "scissors" } as const;

type Lut1 = typeof lut1;
type Lut2 = typeof lut2;
type Lut1Key = keyof Lut1;
type Lut2Key = keyof Lut2;
type Lut1Value = Lut1[keyof Lut1];
type Lut2Value = Lut2[keyof Lut2];

const file = await Deno.open("input.txt");
const data = await readAll(file);
// create array for each line
const lines = new TextDecoder()
  .decode(data)
  .split("\n")
  .map((line) => line.trim());

class RpsGame {
  choiceOfPlayer1: Lut1Value;
  choiceOfPlayer2: Lut2Value;
  result: number;
  constructor(choiceOfPlayer1: Lut1Key, choiceOfPlayer2: Lut2Key) {
    this.choiceOfPlayer1 = lut1[choiceOfPlayer1];
    this.choiceOfPlayer2 = lut2[choiceOfPlayer2];
    this.result = this.gameResult() + this.choiceValue();
  }
  gameResult(): number {
    if (this.choiceOfPlayer1 === this.choiceOfPlayer2) {
      return 3;
    } else if (
      (this.choiceOfPlayer1 === "rock" && this.choiceOfPlayer2 === "paper") ||
      (this.choiceOfPlayer1 === "paper" &&
        this.choiceOfPlayer2 === "scissors") ||
      (this.choiceOfPlayer1 === "scissors" && this.choiceOfPlayer2 === "rock")
    ) {
      return 6;
    } else {
      return 0;
    }
  }
  choiceValue(): number {
    switch (this.choiceOfPlayer2) {
      case "rock":
        return 1;
      case "paper":
        return 2;
      case "scissors":
        return 3;
    }
  }
}

// create an array of games

const games: RpsGame[] = [];

// loop through each line and push the numbers into the games array

for (const line of lines) {
  if (line.length > 0) {
    const [choiceOfPlayer1, choiceOfPlayer2] = line.split(" ");
    games.push(
      new RpsGame(choiceOfPlayer1 as Lut1Key, choiceOfPlayer2 as Lut2Key)
    );
  }
}
console.log(games);

const totalScore = games.reduce((a, b) => a + b.result, 0);
console.log(totalScore);

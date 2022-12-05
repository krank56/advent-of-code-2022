// use deno to read file input.txt
import { readAll } from "https://deno.land/std@0.167.0/streams/read_all.ts";

const lut = { A: "rock", B: "paper", C: "scissors" } as const;
const outcomeLut = { X: "lose", Y: "draw", Z: "win" } as const;

type lut = typeof lut;
type outcomeLut = typeof outcomeLut;
type lutKey = keyof lut;
type outcomeLutKey = keyof outcomeLut;
type lutValue = lut[keyof lut];
type outcomeLutValue = outcomeLut[keyof outcomeLut];

const file = await Deno.open("input.txt");
const data = await readAll(file);
// create array for each line
const lines = new TextDecoder()
  .decode(data)
  .split("\n")
  .map((line) => line.trim());

class RpsGame {
  choiceOfPlayer1: lutValue;
  choiceOfPlayer2: lutValue;
  outcome: outcomeLutValue;
  result: number;
  constructor(choiceOfPlayer1: lutKey, outcome: outcomeLutKey) {
    this.choiceOfPlayer1 = lut[choiceOfPlayer1];
    this.outcome = outcomeLut[outcome];
    this.choiceOfPlayer2 = this.getChoice();
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
  getChoice(): lutValue {
    switch (this.outcome) {
      case "win":
        return this.choiceOfPlayer1 === "rock"
          ? "paper"
          : this.choiceOfPlayer1 === "paper"
          ? "scissors"
          : "rock";
      case "draw":
        return this.choiceOfPlayer1;
      case "lose":
        return this.choiceOfPlayer1 === "rock"
          ? "scissors"
          : this.choiceOfPlayer1 === "paper"
          ? "rock"
          : "paper";
    }
  }
}

// create an array of games

const games: RpsGame[] = [];

// loop through each line and push the numbers into the games array

for (const line of lines) {
  if (line.length > 0) {
    const [choiceOfPlayer1, outcome] = line.split(" ");
    games.push(
      new RpsGame(choiceOfPlayer1 as lutKey, outcome as outcomeLutKey)
    );
  }
}
console.log(games);

const totalScore = games.reduce((a, b) => a + b.result, 0);
console.log(totalScore);

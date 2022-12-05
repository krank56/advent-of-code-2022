const file = await Deno.open("input.txt");
const data = await Deno.readAll(file);
// create array for each line
const lines = new TextDecoder()
  .decode(data)
  .split("\n")
  .map((line) => line.trim());

class Elf {
  index: number;
  caloriesArray: number[];
  totalCalories: number;
  constructor(index: number, caloriesArray: number[]) {
    this.index = index;
    this.caloriesArray = caloriesArray;
    this.totalCalories = caloriesArray.reduce((a, b) => a + b, 0);
  }
}
// create an array of elfs
const elfs: Elf[] = [];
var index = 0;
// loop through each line and push the numbers into the elfs array
var caloriesArray = [];
for (const line of lines) {
  if (line.length > 0) {
    const calories = parseInt(line);
    caloriesArray.push(calories);
  } else {
    elfs.push(new Elf(index, caloriesArray));
    caloriesArray = [];
    index++;
  }
}

const maxCalories = Math.max(...elfs.map((elf) => elf.totalCalories));

console.log(maxCalories);

// b is easy

// top 3 total calories
const top3 = elfs.sort((a, b) => b.totalCalories - a.totalCalories).slice(0, 3);

console.log(top3);

const totalOfTop3 = top3.reduce((a, b) => a + b.totalCalories, 0);

console.log(totalOfTop3);

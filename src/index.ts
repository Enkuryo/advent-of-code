import { readFile } from './utils/readFile';

console.log('******************');
console.log('* ADVENT OF CODE *');
console.log('******************');

const args = Bun.argv;

if (args.length !== 5) {
  console.error('Missing <year>, <day> or <part> arguments');
  console.info('Run it as: bun start <year> <day> <part>');
  process.exit();
}

const year = args[2];
const day = args[3].padStart(2, '0');
const part = +args[4];

const solution = await import(`./${year}/Day ${day}/day${day}.ts`);
const puzzleInput = readFile(__dirname + `/${year}/Day ${day}/input.txt`);

console.log(`Solution for Part ${part} of Day ${day} ${year}:`);

if (part === 1) {
  if (solution.partOne) console.log(solution.partOne(puzzleInput));
  else console.error('No partOne() found for day ' + day);
}
if (part === 2) {
  if (solution.partTwo) console.log(solution.partTwo(puzzleInput));
  else console.error('No partTwo() found for day ' + day);
}

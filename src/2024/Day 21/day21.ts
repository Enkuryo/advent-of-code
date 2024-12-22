import { readFile, type InputType } from '../../utils/readFile';
import { ARROWS_MOVES, KEYPAD_MOVES, Key } from './movements';
import useMemo from '../../hooks/useMemo';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

/**
 * Let's do some thinking how we can solve this problem...
 *
 * +---+---+---+      +---+---+
 * | 7 | 8 | 9 |      | ^ | A |
 * +---+---+---+  +---+---+---+
 * | 4 | 5 | 6 |  | < | v | > |
 * +---+---+---+  +---+---+---+
 * | 1 | 2 | 3 |
 * +---+---+---+
 *     | 0 | A |
 *     +---+---+
 */

const solver = (commands: string[], numberOfRobots: number) => {
  // The total complexity of the input
  let complexity = 0;

  for (let command of commands) {
    // Get the numerical part of the number
    let numericalPartOfCommand = parseInt(command.replace('A', ''));

    // Get the arrow sequence for the first roboter
    let arrowCommands = processNumberCommand(command);
    let shortestPathLength = Number.MAX_SAFE_INTEGER;

    // Go through each input of the command and find the shortest path
    for (let arrowCommand of arrowCommands) {
      shortestPathLength = Math.min(shortestPathLength, findShortestPath(arrowCommand, numberOfRobots));
    }

    // Add the length of the shortest path times the numerical part to the total complexity
    complexity += shortestPathLength * numericalPartOfCommand;
  }

  return complexity;
};

const findShortestPath = useMemo((command: string, numberOfRobots: number, keypad: number = 0) => {
  // If the current keypad has reached the number of robots, we can return, because that is when
  // the humand enters the keys
  if (keypad === numberOfRobots) return command.length;

  // Get the next available arrow command
  let nextCommand = processArrowCommand(command);
  let commandSplits = nextCommand
    .split('A')
    .filter((command: string, index: number, array: string[]) => index !== array.length - 1)
    .map((c: string) => c + 'A');

  let shortest = 0;
  for (let splitCommand of commandSplits) {
    shortest += findShortestPath(splitCommand, numberOfRobots, keypad + 1);
  }

  return shortest;
});

const processArrowCommand = (command: string): string => {
  let current = 'A';
  let output = '';

  for (let button of command) {
    let actions = ARROWS_MOVES[current][button][0];
    output += actions;
    current = button;
  }
  return output;
};

const processNumberCommand = (command: string): string[] => {
  let current = 'A';
  let outputs = [''];
  for (let button of command) {
    let actions = KEYPAD_MOVES[current][button];
    let newOutputs = [];
    for (let output of outputs) {
      for (let action of actions) {
        newOutputs.push(output + action);
      }
    }
    outputs = newOutputs;
    current = button;
  }
  return outputs;
};

export const partOne = (input: InputType): number => {
  return solver(input, 2);
};

export const partTwo = (input: InputType): number => {
  return solver(input, 25);
};

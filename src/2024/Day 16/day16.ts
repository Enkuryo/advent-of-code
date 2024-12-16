import { stringWidth } from 'bun';
import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type Cell = {
  direction: string; // Use 'o' as placeholder for no direction
  value: number;
};

const Directions: { [key: string]: [string, string, string] } = {
  '^': ['<', '^', '>'],
  '>': ['^', '>', 'v'],
  v: ['>', 'v', '<'],
  '<': ['v', '<', '^'],
};

// All neighbors to check for the current tile
const Neighbors: { [key: string]: [Point, Point, Point] } = {
  '^': [new Point(0, -1), new Point(-1, 0), new Point(0, 1)],
  '>': [new Point(-1, 0), new Point(0, 1), new Point(1, 0)],
  v: [new Point(0, 1), new Point(1, 0), new Point(0, -1)],
  '<': [new Point(1, 0), new Point(0, -1), new Point(-1, 0)],
};

export const partOne = (input: InputType): number => {
  const map: string[][] = input.map((line) => line.split(''));
  const cells: { [key: string]: Cell } = {};

  let endPosition: string = '';
  const cellsToProcess: string[] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      switch (map[y][x]) {
        case '#':
          break;
        case 'E':
          endPosition = new Point(y, x).toString();
          cells[new Point(y, x).toString()] = {
            direction: 'E',
            value: Number.MAX_SAFE_INTEGER,
          };
          break;
        case '.':
        case 'S':
          let cell: Cell = {
            direction: map[y][x] === 'S' ? '>' : 'o',
            value: map[y][x] === 'S' ? 0 : Number.MAX_SAFE_INTEGER,
          };
          if (map[y][x] === 'S') {
            cellsToProcess.push(new Point(y, x).toString());
          }
          cells[new Point(y, x).toString()] = cell;
          break;
      }
    }
  }

  while (cellsToProcess.length > 0) {
    const currentProcessedCellPosition = cellsToProcess.shift() ?? '0|0';
    const currentProcessedCell = cells[currentProcessedCellPosition];

    for (let i = 0; i < 3; i++) {
      const neighborPosition = Point.addPointToPointString(
        currentProcessedCellPosition,
        Neighbors[currentProcessedCell.direction][i]
      );
      const neighborCell = cells[neighborPosition];
      if (neighborCell) {
        if (currentProcessedCell.value + (i == 1 ? 1 : 1001) < neighborCell.value) {
          neighborCell.value = currentProcessedCell.value + (i == 1 ? 1 : 1001);
          neighborCell.direction = Directions[currentProcessedCell.direction][i];

          cellsToProcess.push(neighborPosition);
        }
      }
    }
  }

  return cells[endPosition].value;
};

export const partTwo = (input: InputType): number => {
  return -1;
};

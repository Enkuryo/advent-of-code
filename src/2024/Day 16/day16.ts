import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type Cell = {
  x: number;
  y: number;
  path: string[];
  cost: number;
  direction: string;
};

type Map = string[][];

const Directions: { [key: string]: Point } = {
  '^': new Point(-1, 0),
  '>': new Point(0, 1),
  v: new Point(1, 0),
  '<': new Point(0, -1),
};

const findOnMap = (map: Map, needle: string): Point => {
  let point: Point = new Point();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === needle) {
        point.setPoint(y, x);
        return point;
      }
    }
  }

  return point;
};

const findPaths = (map: Map): { minCost: number; paths: string[][] } => {
  const visited: { [key: string]: number } = {};
  const start: Point = findOnMap(map, 'S');
  const end: Point = findOnMap(map, 'E');

  let paths: string[][] = [];
  let minCost = Number.MAX_SAFE_INTEGER;

  const cellsToCheck: Cell[] = [];

  cellsToCheck.push({
    x: start.getX(),
    y: start.getY(),
    cost: 0,
    path: [],
    direction: '>',
  });

  let i = 1;

  while (cellsToCheck.length) {
    // Get the next cell to check
    const currentCell = cellsToCheck.shift();
    if (!currentCell)
      throw Error('WTF? cellsToCheck.length > 0 but no cell shifted?');

    const { x, y, direction } = currentCell;
    const key = `${x},${y},${direction}`;
    currentCell.path.push(key);

    if (currentCell.y === end.getY() && currentCell.x === end.getX()) {
      if (currentCell.cost < minCost) {
        paths = [currentCell.path];
        minCost = currentCell.cost;
      }
      if (currentCell.cost === minCost) paths.push(currentCell.path);
      continue;
    }

    if (!(key in visited)) visited[key] = Number.MAX_SAFE_INTEGER;
    if (visited[key] < currentCell.cost) continue;
    visited[key] = currentCell.cost;
    if (currentCell.cost > minCost) continue;

    Object.entries(Directions).forEach(([dir, point]) => {
      if (
        (dir === '^' && direction === 'v') ||
        (dir === 'v' && direction === '^') ||
        (dir === '<' && direction === '>') ||
        (dir === '>' && direction === '<')
      )
        return;

      const nx = x + point.getX();
      const ny = y + point.getY();
      if (map[ny][nx] === '#') return;
      const isTurn = dir !== direction;
      cellsToCheck.push({
        x: nx,
        y: ny,
        cost: isTurn ? currentCell.cost + 1001 : currentCell.cost + 1,
        direction: dir,
        path: [...currentCell.path],
      });
    });
  }

  return {
    minCost,
    paths,
  };
};

export const partOne = (input: string[]): number => {
  const map: string[][] = input.map((line) => line.split(''));

  const { minCost, paths } = findPaths(map);

  return minCost;
};

export const partTwo = (input: string[]): number => {
  const map: string[][] = input.map((line) => line.split(''));

  const { minCost, paths } = findPaths(map);

  const cellsInPaths: Set<string> = new Set<string>();

  paths.forEach((path) =>
    path.forEach((p) => {
      const parts = p.split(',');
      const newKey = parts.slice(0, 2).join(',');
      cellsInPaths.add(newKey);
    })
  );

  return cellsInPaths.size;
};

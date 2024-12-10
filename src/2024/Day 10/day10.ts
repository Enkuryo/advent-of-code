import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type MapType = Array<string[]>;

type PathType = Array<string>;

type Point = { x: number; y: number };

const DIRECTIONS: Point[] = [
  { y: -1, x: 0 }, // UP
  { y: 0, x: 1 }, // RIGHT
  { y: 1, x: 0 }, // DOWN
  { y: 0, x: -1 }, // LEFT
];

const printMap = (map: MapType): void => {
  console.log(map.map((line) => line.join('')).join('\n'));
};

const inBounds = (point: Point, map: MapType): boolean => {
  const { x, y } = point;
  return y >= 0 && x >= 0 && y < map.length && x < map[y].length;
};

const addPoints = (a: Point, b: Point): Point => {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
};

const getHeightAtPoint = (point: Point, map: MapType): number => {
  const charAtPoint = map[point.y][point.x];
  return charAtPoint !== '.' ? +charAtPoint : -1;
};

const pointToIndex = (point: Point, map: MapType): number => {
  return point.x + point.y * map[point.y].length;
};

export const partOne = (input: InputType): number => {
  const walkPath = (
    position: Point,
    map: MapType,
    height: number = 0,
    ninesVisitedThisRun = new Set<string>()
  ): Set<string> => {
    // We need to check all four directions, if there is a nine, and if so add it to the total this trail can visit

    const newHeight = height + 1;

    for (const dir of DIRECTIONS) {
      const newPosition = addPoints(position, dir);
      const isInBounds = inBounds(newPosition, map);

      if (isInBounds && getHeightAtPoint(newPosition, map) === newHeight) {
        if (newHeight === 9) {
          ninesVisitedThisRun.add(`${newPosition.y}|${newPosition.x}`);
        } else {
          const visitedNines = walkPath(newPosition, map, newHeight, ninesVisitedThisRun);
          ninesVisitedThisRun = new Set<string>([...ninesVisitedThisRun, ...visitedNines]);
        }
      }
    }

    return ninesVisitedThisRun;
  };

  const map: MapType = input.map((line) => line.split(''));
  let totalTrailHeads = 0;

  // Goto through the map and find 0's as starting points for trails and check how many '9's we can reach
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '0') {
        const currentPosition: Point = { y, x };
        const visitedNines = walkPath(currentPosition, map);
        totalTrailHeads += visitedNines.size;
      }
    }
  }

  return totalTrailHeads;
};

export const partTwo = (input: InputType): number => {
  0;
  const walkPath = (
    position: Point,
    map: MapType,
    height: number = 0,
    pathUntilNow: number[] = [],
    completePaths: Set<string> = new Set<string>()
  ) => {
    const newHeight = height + 1;
    const prefix = '-'.repeat(newHeight);

    for (const dir of DIRECTIONS) {
      const newPosition = addPoints(position, dir);
      const isInBounds = inBounds(newPosition, map);

      if (isInBounds && getHeightAtPoint(newPosition, map) === newHeight) {
        pathUntilNow.push(pointToIndex(newPosition, map));

        if (newHeight === 9) {
          completePaths.add(pathUntilNow.join('_'));
        } else {
          completePaths = new Set([
            ...completePaths,
            ...walkPath(newPosition, map, newHeight, pathUntilNow, completePaths),
          ]);
        }
      }
    }
    return completePaths;
  };

  const map: MapType = input.map((line) => line.split(''));

  let totalTrailHeads = 0;

  // Goto through the map and find 0's as starting points for trails and check how many '9's we can reach
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '0') {
        const currentPosition: Point = { y, x };
        const possiblePaths = walkPath(currentPosition, map, 0, [pointToIndex(currentPosition, map)]);
        totalTrailHeads += possiblePaths.size;
      }
    }
  }

  return totalTrailHeads;
};

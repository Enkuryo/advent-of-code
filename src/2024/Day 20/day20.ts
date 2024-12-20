import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type MapType = string[][];
type DistanceMapType = { [key: number]: string };

const findInMap = (map: MapType, needle: string): Point => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === needle) {
        return new Point(y, x);
      }
    }
  }
  return new Point();
};

const parseMap = (map: MapType): DistanceMapType => {
  let distances: DistanceMapType = {};
  let start: Point = findInMap(map, 'S');
  let end: Point = findInMap(map, 'E');

  let currentPosition: Point = start;
  let currentDistance: number = 0;
  let visitedPoints: Set<string> = new Set<string>();

  while (true) {
    // Mark the current position as visited
    visitedPoints.add(currentPosition.toString());
    distances[currentDistance] = currentPosition.toString();

    if (currentPosition.equalsPoint(end)) break;

    // Check all four neighbor directions for a free path
    for (let dir of ['-1|0', '0|1', '1|0', '0|-1']) {
      let nPos = Point.fromString(
        Point.addPointToPointString(dir, currentPosition)
      );
      if (
        map[nPos.getY()] &&
        map[nPos.getY()][nPos.getX()] !== '#' &&
        !visitedPoints.has(nPos.toString())
      ) {
        currentPosition = nPos;
        currentDistance++;
        break;
      }
    }
  }

  return distances;
};

const getShortcuts = (
  path: DistanceMapType,
  cheatTime: number,
  minTimeToSave: number
): number => {
  let possibleShortcuts: number = 0;
  const positionsOnPath: { [key: string]: number } = {};

  for (let i = 0; i < Object.values(path).length; i++) {
    const pos = Object.values(path)[i];
    positionsOnPath[pos] = i;
  }

  for (let p in path) {
    const position = path[p];
    for (let y = -cheatTime; y <= cheatTime; y++) {
      for (let x = -cheatTime; x <= cheatTime; x++) {
        if (y === 0 && x === 0) continue;

        const pointToTest = Point.addPointToPointString(
          position,
          new Point(y, x)
        );
        if (positionsOnPath[pointToTest]) {
          const distance = Point.getDistanceBetween(position, pointToTest);
          const valueAtTarget = positionsOnPath[pointToTest];
          const saving = valueAtTarget - +p - distance;

          if (distance <= cheatTime && saving >= minTimeToSave) {
            possibleShortcuts++;
          }
        }
      }
    }
  }

  return possibleShortcuts;
};

export const partOne = (
  input: InputType,
  cheatTime: number = 2,
  minTimeToSave: number = 100
): number => {
  const map = input.map((line) => line.split(''));
  const distances = parseMap(map);
  return getShortcuts(distances, cheatTime, minTimeToSave);
};

export const partTwo = (
  input: InputType,
  cheatTime: number = 20,
  minTimeToSave: number = 100
): number => {
  const map = input.map((line) => line.split(''));
  const distances = parseMap(map);
  return getShortcuts(distances, cheatTime, minTimeToSave);
};

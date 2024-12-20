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

const parseMap = (
  map: MapType
): {
  start: Point;
  distances: DistanceMapType;
  maxDistance: number;
} => {
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

  return {
    start,
    distances,
    maxDistance: Math.max(...Object.keys(distances).map((n) => +n)),
  };
};

const getTimeSavedWithShortcut = (
  map: MapType,
  distances: DistanceMapType,
  position: Point,
  direction: Point
): number => {
  // Check if point in directio is '#' and point in 2 * direction is '.'
  const nPos = Point.addTwoPoints(position, direction);

  if (map[nPos.getY()] && map[nPos.getY()][nPos.getX()] === '#') {
    const nnPos = Point.addTwoPoints(nPos, direction);
    if (
      map[nnPos.getY()] &&
      (map[nnPos.getY()][nnPos.getX()] === '.' ||
        map[nnPos.getY()][nnPos.getX()] === 'E')
    ) {
      const timeAtPosition = distances[position.toString()];
      const timeAtShortcut = distances[nnPos.toString()];
      const diff = timeAtShortcut - timeAtPosition - 2;
      if (diff > 0) {
        return diff;
      }
    }
  }

  return 0;
};

const getShortcuts = (
  path: DistanceMapType,
  cheatTime: number,
  minTimeToSave: number
): number => {
  let possibleShortcuts: number = 0;
  const positionsOnPath = Object.values(path);

  for (let p in path) {
    const position = path[p];
    for (let y = -cheatTime; y <= cheatTime; y++) {
      for (let x = -cheatTime; x <= cheatTime; x++) {
        if (y === 0 && x === 0) continue;

        const pointToTest = Point.addPointToPointString(
          position,
          new Point(y, x)
        );
        if (positionsOnPath.indexOf(pointToTest) > -1) {
          const distance = Point.getDistanceBetween(position, pointToTest);
          const valueAtTarget = positionsOnPath.indexOf(pointToTest);
          const saving = valueAtTarget - +p - distance;

          const validShortcut = distance < valueAtTarget;

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
  const { start, distances, maxDistance } = parseMap(map);
  return getShortcuts(distances, cheatTime, minTimeToSave);
};

export const partTwo = (input: InputType): number => {
  const map = input.map((line) => line.split(''));
  const { start, distances, maxDistance } = parseMap(map);

  return 0;
};

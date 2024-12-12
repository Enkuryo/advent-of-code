import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

/***
 * IDEA:
 * Go through each point
 * - Check if we already have visited that point
 * - If yes, skip it
 * - If no, try to fill the field and get all points belonging to that field
 */

type Map = Array<Array<string>>;

type Region = {
  fieldType: string;
  points: string[];
};

const DIRECTIONS = [
  { y: -1, x: 0 }, // UP
  { y: 0, x: 1 }, // RIGHT
  { y: 1, x: 0 }, // DOWN
  { y: 0, x: -1 }, // LEFT
];

const printMap = (map: Map): void => {
  console.log(map.map((line) => line.join('')).join('\n'));
};

const inBounds = (point: Point, map: Map): boolean => {
  const [x, y] = [point.getX(), point.getY()];
  return y >= 0 && y < map.length && x >= 0 && x < map[y].length;
};

const getRegionPerimeter = (region: Region): number => {
  // Go through each point in the region, counting the neighbors.
  // 4 - n is the fences around that point, where n is the amount of neighbors

  let perimeter = 0;

  for (let point of region.points) {
    let neighbors = 0;
    for (let dir of DIRECTIONS) {
      const newPoint = Point.fromString(point).add(new Point(dir.y, dir.x)).toString();
      if (region.points.indexOf(newPoint) > -1) {
        neighbors++;
      }
    }
    perimeter += 4 - neighbors;
  }

  return perimeter;
};

const walkField = (map: Map, startPosition: Point, visitedPoints: Set<string>, region: Region): Region => {
  const fieldType = map[startPosition.getY()][startPosition.getX()];

  // Adding the current point to the visited point list
  visitedPoints.add(startPosition.toString());

  // Checking all for directions if the field continues
  for (let dir of DIRECTIONS) {
    const positionToCheck = new Point(dir.y, dir.x).add(startPosition);
    if (inBounds(positionToCheck, map) && !visitedPoints.has(positionToCheck.toString())) {
      if (map[positionToCheck.getY()][positionToCheck.getX()] === region.fieldType) {
        region.points.push(positionToCheck.toString());
        walkField(map, positionToCheck, visitedPoints, region);
      }
    }
  }

  return region;
};

export const partOne = (input: InputType): number => {
  // Save all points we visited, so no point is visited again
  const visitedPoints = new Set<string>();
  const map: Map = input.map((line) => line.split(''));

  let totalCost = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      // Get the current location as point
      const point = new Point(y, x);

      if (visitedPoints.has(point.toString())) continue;
      const fieldType = map[y][x];
      const currentRegion: Region = { fieldType, points: [point.toString()] };
      const region = walkField(map, point, visitedPoints, currentRegion);

      const area = region.points.length;
      const perimeter = getRegionPerimeter(region);
      const cost = area * perimeter;

      totalCost += cost;
    }
  }

  return totalCost;
};

export const partTwo = (input: InputType): number => {
  return -1;
};

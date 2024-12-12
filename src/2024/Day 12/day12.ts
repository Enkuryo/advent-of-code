import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

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

const inBounds = (point: Point, map: Map): boolean => {
  const [x, y] = [point.getX(), point.getY()];
  return y >= 0 && y < map.length && x >= 0 && x < map[y].length;
};

const getRegionPerimeter = (region: Region): number => {
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

const isPointInRegion = (point: string, region: Region): boolean => {
  return region.points.indexOf(point) > -1;
};

const coordsToIndex = (point: string, map: Map): number => {
  const WIDTH = map[0].length;
  const p = Point.fromString(point);

  const index = p.getX() + p.getY() * WIDTH;

  return index;
};

const getRegionBorders = (region: Region, map: Map): number => {
  let lastPointUp;
  let lastPointRight;
  let lastPointDown;
  let lastPointLeft;

  let topBorders = 0;
  let rightBorders = 0;
  let bottomBorders = 0;
  let leftBorders = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const point = new Point(y, x).toString();
      // Count all top borders
      if (isPointInRegion(point, region) && !isPointInRegion(Point.addDirectionToPointString(point, -1, 0), region)) {
        if (lastPointLeft && lastPointLeft == Point.addDirectionToPointString(point, 0, -1)) {
        } else {
          topBorders++;
        }
        lastPointLeft = point;
      }
    }
  }

  for (let x = map[0].length - 1; x >= 0; x--) {
    for (let y = 0; y < map.length; y++) {
      const point = new Point(y, x).toString();
      // Count all right
      if (isPointInRegion(point, region) && !isPointInRegion(Point.addDirectionToPointString(point, 0, 1), region)) {
        if (lastPointUp && lastPointUp == Point.addDirectionToPointString(point, -1, 0)) {
        } else {
          rightBorders++;
        }
        lastPointUp = point;
      }
    }
  }

  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = map[y].length - 1; x >= 0; x--) {
      const point = new Point(y, x).toString();
      // Count all bottom
      if (isPointInRegion(point, region) && !isPointInRegion(Point.addDirectionToPointString(point, 1, 0), region)) {
        if (lastPointRight && lastPointRight == Point.addDirectionToPointString(point, 0, 1)) {
        } else {
          bottomBorders++;
        }
        lastPointRight = point;
      }
    }
  }

  for (let x = 0; x < map[0].length; x++) {
    for (let y = map.length - 1; y >= 0; y--) {
      const point = new Point(y, x).toString();
      // Count all bottom
      if (isPointInRegion(point, region) && !isPointInRegion(Point.addDirectionToPointString(point, 0, -1), region)) {
        if (lastPointDown && lastPointDown == Point.addDirectionToPointString(point, 1, 0)) {
        } else {
          leftBorders++;
        }
        lastPointDown = point;
      }
    }
  }

  return topBorders + rightBorders + bottomBorders + leftBorders;
};

const walkField = (map: Map, startPosition: Point, visitedPoints: Set<string>, region: Region): Region => {
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

      const border = getRegionBorders(region, map);
      const cost = area * border;

      totalCost += cost;
    }
  }

  return totalCost;
};

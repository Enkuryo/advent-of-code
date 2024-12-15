import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type Robot = {
  position: Point;
  velocity: Point;
};

type Quadrant = {
  x1: number; // Top Left point
  y1: number;
  x2: number; // Bottom right point
  y2: number;
};

const createQuadrants = (width: number, height: number): Quadrant[] => {
  const quadrants: Quadrant[] = [];

  const horizontalMid = width / 2;
  const verticalMid = height / 2;

  // Top Left Quadrant
  quadrants.push({
    x1: 0,
    y1: 0,
    x2: Math.floor(horizontalMid) - 1,
    y2: Math.floor(verticalMid) - 1,
  });
  // Top Right Quadrant
  quadrants.push({
    x1: Math.floor(horizontalMid) + 1,
    y1: 0,
    x2: width - 1,
    y2: Math.floor(verticalMid) - 1,
  });
  // Bottom Left Quadrant
  quadrants.push({
    x1: 0,
    y1: Math.floor(verticalMid) + 1,
    x2: Math.floor(horizontalMid) - 1,
    y2: height - 1,
  });
  // Bottom Right Quadrant
  quadrants.push({
    x1: Math.floor(horizontalMid) + 1,
    y1: Math.floor(verticalMid) + 1,
    x2: width - 1,
    y2: height - 1,
  });

  return quadrants;
};

const isInQuadrant = (y: number, x: number, quadrants: Quadrant[]) => {
  for (let q of quadrants) {
    if (x >= q.x1 && x <= q.x2 && y >= q.y1 && y <= q.y2) return true;
  }
  return false;
};

const mapInputToRobotArray = (input: InputType): Robot[] => {
  return input.map<Robot>((robot): Robot => {
    const match = robot.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/);
    if (match) {
      const [_, px, py, vx, vy] = match;
      return {
        position: new Point(+py, +px),
        velocity: new Point(+vy, +vx),
      };
    }
    return { position: new Point(), velocity: new Point() };
  });
};

const printMap = (
  map: Array<Array<number>>,
  quadrants: Quadrant[] | null = null,
  showNumbers: boolean = true
): void => {
  const mapWithBorders: Array<Array<string>> = JSON.parse(JSON.stringify(map));

  for (let y = 0; y < mapWithBorders.length; y++) {
    for (let x = 0; x < mapWithBorders[y].length; x++) {
      if (quadrants) {
        if (!isInQuadrant(y, x, quadrants)) {
          mapWithBorders[y][x] = ' ';
        }
      }
    }
  }

  console.log(
    mapWithBorders.map((line) => line.map((l) => (l == '0' ? '.' : showNumbers ? l : '#')).join('')).join('\n')
  );
};

export const partOne = (input: InputType, width: number = 101, height: number = 103): number => {
  const robots: Robot[] = mapInputToRobotArray(input);
  const quadrants: Quadrant[] = createQuadrants(width, height);

  const map = Array.from({ length: height }, (y) => Array.from({ length: width }, (x) => 0));

  let safetyFactor: number = 1;

  for (let robot of robots) {
    const px = robot.position.getX();
    const py = robot.position.getY();
    const vx = robot.velocity.getX();
    const vy = robot.velocity.getY();

    const npy = (py + vy) % height;
    const npx = (px + vx) % width;

    const epy = npy < 0 ? height + npy : npy;
    const epx = npx < 0 ? width + npx : npx;

    map[epy][epx]++;
  }

  for (let q of quadrants) {
    let numberOfRobots: number = 0;

    for (let y = q.y1; y <= q.y2; y++) {
      for (let x = q.x1; x <= q.x2; x++) {
        numberOfRobots += map[y][x];
      }
    }

    safetyFactor *= numberOfRobots;
  }

  return safetyFactor;
};

export const partTwo = (input: InputType, width: number = 101, height: number = 103): number => {
  const robots: Robot[] = mapInputToRobotArray(input);
  const quadrants: Quadrant[] = createQuadrants(width, height);

  let safetyFactor: number = 1;

  let stepCount: number = 0;

  const move = () => {
    const map = Array.from({ length: height }, (y) => Array.from({ length: width }, (x) => 0));

    for (let robot of robots) {
      const px = robot.position.getX();
      const py = robot.position.getY();
      const vx = robot.velocity.getX();
      const vy = robot.velocity.getY();

      const npy = (py + vy) % height;
      const npx = (px + vx) % width;

      const epy = npy < 0 ? height + npy : npy;
      const epx = npx < 0 ? width + npx : npx;

      robot.position.setX(epx);
      robot.position.setY(epy);

      map[epy][epx]++;
    }

    for (let q of quadrants) {
      let numberOfRobots: number = 0;

      for (let y = q.y1; y <= q.y2; y++) {
        for (let x = q.x1; x <= q.x2; x++) {
          numberOfRobots += map[y][x];
        }
      }

      safetyFactor *= numberOfRobots;
    }

    stepCount++;

    if (
      map
        .map((line) => line.map((c) => (c === 0 ? '.' : '#')).join(''))
        .join('\n')
        .indexOf('########') > -1
    ) {
      console.clear();
      printMap(map, null, false);
    } else {
      move();
    }
  };

  move();

  return stepCount;
};

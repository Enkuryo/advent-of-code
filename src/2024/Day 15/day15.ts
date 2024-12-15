import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type DirectionType = '<' | '^' | '>' | 'v';

type RobotType = {
  position: Point;
};

const MOVES = {
  '<': new Point(0, -1),
  '^': new Point(-1, 0),
  '>': new Point(0, 1),
  v: new Point(1, 0),
};

const moveAndPush = (position: Point, move: DirectionType, map: string[][], simulate: boolean = false): boolean => {
  const targetPosition = Point.addTwoPoints(MOVES[move], position);
  const mapAtTarget = map[targetPosition.getY()][targetPosition.getX()];

  const currentBox = map[position.getY()][position.getX()];

  switch (mapAtTarget) {
    case '#':
      return false;
    case 'O':
      if (moveAndPush(targetPosition, move, map)) {
        const boxTarget = Point.addTwoPoints(MOVES[move], targetPosition);
        map[boxTarget.getY()][boxTarget.getX()] = 'O';
        map[targetPosition.getY()][targetPosition.getX()] = '.';
        return true;
      }
      return false;
    case '[':
      // Left and right behave like before
      if (move === '>' || move === '<') {
        if (moveAndPush(targetPosition, move, map)) {
          const boxTarget = Point.addTwoPoints(MOVES[move], targetPosition);
          map[boxTarget.getY()][boxTarget.getX()] = '[';
          map[targetPosition.getY()][targetPosition.getX()] = '.';
          return true;
        }
      }
      if (move === '^' || move === 'v') {
        if (
          moveAndPush(targetPosition, move, map, true) &&
          moveAndPush(Point.addTwoPoints(targetPosition, new Point(0, 1)), move, map, true)
        ) {
          if (!simulate) {
            moveAndPush(targetPosition, move, map);
            moveAndPush(Point.addTwoPoints(targetPosition, new Point(0, 1)), move, map);
            const boxTarget = Point.addTwoPoints(MOVES[move], targetPosition);
            map[boxTarget.getY()][boxTarget.getX()] = '[';
            map[targetPosition.getY()][targetPosition.getX()] = '.';

            const boxRightSide = Point.addTwoPoints(boxTarget, new Point(0, 1));
            const targetRightSide = Point.addTwoPoints(targetPosition, new Point(0, 1));
            map[boxRightSide.getY()][boxRightSide.getX()] = ']';
            map[targetRightSide.getY()][targetRightSide.getX()] = '.';
          }
          return true;
        }
      }
      return false;
    case ']':
      // Left and right behave like before
      if (move === '>' || move === '<') {
        if (moveAndPush(targetPosition, move, map)) {
          const boxTarget = Point.addTwoPoints(MOVES[move], targetPosition);
          map[boxTarget.getY()][boxTarget.getX()] = ']';
          map[targetPosition.getY()][targetPosition.getX()] = '.';
          return true;
        }
      }
      if (move === '^' || move === 'v') {
        if (
          moveAndPush(targetPosition, move, map, true) &&
          moveAndPush(Point.addTwoPoints(targetPosition, new Point(0, -1)), move, map, true)
        ) {
          if (!simulate) {
            moveAndPush(targetPosition, move, map);
            moveAndPush(Point.addTwoPoints(targetPosition, new Point(0, -1)), move, map);
            const boxTarget = Point.addTwoPoints(MOVES[move], targetPosition);
            map[boxTarget.getY()][boxTarget.getX()] = ']';
            map[targetPosition.getY()][targetPosition.getX()] = '.';

            const boxLeftSide = Point.addTwoPoints(boxTarget, new Point(0, -1));
            const targetLeftSide = Point.addTwoPoints(targetPosition, new Point(0, -1));
            map[boxLeftSide.getY()][boxLeftSide.getX()] = '[';
            map[targetLeftSide.getY()][targetLeftSide.getX()] = '.';
          }

          return true;
        }
      }
      return false;
    case '.':
      return true;
  }

  return false;
};

const step = (move: DirectionType, robot: RobotType, map: string[][]) => {
  const targetPosition = Point.addTwoPoints(MOVES[move], robot.position);

  if (moveAndPush(robot.position, move, map)) {
    robot.position = targetPosition;
  }
};

const printMap = (map: Array<Array<string>>, robot: { position: Point }, replaceWithEmoji: boolean = false): void => {
  const tmpMap: Array<Array<string>> = JSON.parse(JSON.stringify(map));
  tmpMap[robot.position.getY()][robot.position.getX()] = '@';
  console.log(
    tmpMap
      .map((line) =>
        line
          .map((c) => {
            if (replaceWithEmoji)
              return {
                '.': '  ',
                '#': '🧱',
                '@': '👨',
                O: '📦',
                '[': '[=',
                ']': '=]',
              }[c];
            return c;
          })
          .join('')
      )
      .join('\n')
  );
  console.log();
};

export const partOne = (input: InputType): number => {
  const map: string[][] = [];
  const moveList: DirectionType[] = [];

  const robot: RobotType = {
    position: new Point(),
  };

  for (let line of input) {
    if (line.indexOf('#') > -1) {
      if (line.indexOf('@') > -1) {
        robot.position.setY(map.length);
        robot.position.setX(line.indexOf('@'));
        line = line.replace('@', '.');
      }
      map.push(line.split(''));
    } else if (line === '\n') {
    } else {
      moveList.push(...line.split('').map((n) => n as DirectionType));
    }
  }

  /* Map and robot are prepared! Let's-a go! */
  for (let move of moveList) {
    step(move, robot, map);
  }

  let gpsSum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'O') {
        gpsSum += y * 100 + x;
      }
    }
  }

  printMap(map, robot);

  return gpsSum;
};

export const partTwo = (input: InputType, takeMapAsIs: boolean = false): number => {
  let map: string[][] = [];
  const moveList: DirectionType[] = [];

  const robot = {
    position: new Point(),
  };

  for (let line of input) {
    if (line.indexOf('#') > -1) {
      if (!takeMapAsIs)
        line = line.replaceAll('#', '##').replaceAll('O', '[]').replaceAll('.', '..').replace('@', '@.');
      map.push(line.split(''));
    } else if (line === '\n') {
    } else {
      moveList.push(...line.split('').map((n) => n as DirectionType));
    }
  }

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '@') {
        robot.position = new Point(y, x);
        map[y][x] = '.';
      }
    }
  }

  /* Map and robot are prepared! Let's-a go! */

  console.log('INITIAL MAP');
  printMap(map, robot);

  for (let move of moveList) {
    step(move, robot, map);
  }

  console.log('MOVES DONE');
  printMap(map, robot);

  let gpsSum = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '[') {
        const sum = y * 100 + x;
        gpsSum += sum;
      }
    }
  }

  return gpsSum;
};

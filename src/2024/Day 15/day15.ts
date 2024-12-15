import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type DirectionType = '<' | '^' | '>' | 'v';

const MOVES = {
  '<': new Point(0, -1),
  '^': new Point(-1, 0),
  '>': new Point(0, 1),
  v: new Point(1, 0),
};

const printMap = (map: Array<Array<string>>, robot: { position: Point }): void => {
  const tmpMap: Array<Array<string>> = JSON.parse(JSON.stringify(map));
  tmpMap[robot.position.getY()][robot.position.getX()] = '@';
  console.log(tmpMap.map((line) => line.join('')).join('\n'));
  console.log();
};

export const partOne = (input: InputType): number => {
  const map: string[][] = [];
  const moveList: DirectionType[] = [];

  const robot = {
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

  const moveAndPush = (position: Point, move: DirectionType): boolean => {
    const targetPosition = Point.addTwoPoints(MOVES[move], position);
    const mapAtTarget = map[targetPosition.getY()][targetPosition.getX()];

    switch (mapAtTarget) {
      case '#':
        return false;
      case 'O':
        let canMove = moveAndPush(targetPosition, move);
        if (canMove) {
          const boxTarget = Point.addTwoPoints(MOVES[move], targetPosition);
          map[boxTarget.getY()][boxTarget.getX()] = 'O';
          map[targetPosition.getY()][targetPosition.getX()] = '.';
        }
        return canMove;
      case '.':
        return true;
    }

    return false;
  };

  const step = (move: DirectionType) => {
    const targetPosition = Point.addTwoPoints(MOVES[move], robot.position);

    if (moveAndPush(robot.position, move)) {
      robot.position = targetPosition;
    }
  };

  for (let move of moveList) {
    step(move);
  }

  let gpsSum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'O') {
        gpsSum += y * 100 + x;
      }
    }
  }

  return gpsSum;
};

export const partTwo = (input: InputType): number => {
  return -1;
};

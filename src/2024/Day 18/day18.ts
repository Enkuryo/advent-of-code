import { textSpanIntersectsWith } from 'typescript';
import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type Memory = string[][];

type AStarNode = {
  f: number;
  g: number;
  h: number;
  debug: string;
  parent: AStarNode | null;
  pos: string;
};

type AStarGrid = AStarNode[][];
type AStarDict = { [key: string]: AStarNode };

const initializeMemorySpace = (
  input: InputType,
  width: number,
  height: number,
  maxBytesToProcess: number = 1024
): Memory => {
  let MEM_SPACE = Array.from({ length: height }, (line) => Array.from({ length: width }, (c) => '.'));

  let stopAfter = 0;
  for (let line of input) {
    const [x, y] = line.split(',');
    MEM_SPACE[+y][+x] = '#';
    if (++stopAfter >= maxBytesToProcess) break;
  }

  return MEM_SPACE;
};

class AStar {
  #grid: AStarGrid;
  #memory: Memory;

  constructor(memory: Memory) {
    this.#memory = memory;
    this.#grid = [];

    for (let y = 0; y < memory.length; y++) {
      this.#grid.push([]);
      for (let x = 0; x < memory.length; x++) {
        this.#grid[y].push({
          f: 0,
          g: 0,
          h: 0,
          debug: '',
          parent: null,
          pos: `${y}|${x}`,
        });
      }
    }
  }

  search(start: Point, end: Point) {
    const startCell: AStarNode = {
      f: 0,
      g: 0,
      h: 0,
      debug: '',
      parent: null,
      pos: '0|0',
    };

    let openList: AStarDict = {};
    let closedList: AStarDict = {};

    openList[startCell.pos] = startCell;

    while (Object.keys(openList).length > 0) {
      let openListKeyList = Object.keys(openList);
      let lowestIndex = 0;
      for (var i = 0; i < openListKeyList.length; i++) {
        if (openList[openListKeyList[i]] < openList[openListKeyList[lowestIndex]]) {
          lowestIndex = i;
        }
      }

      let currentNode = openList[openListKeyList[lowestIndex]];

      // End case -- Result has been found, return the path
      if (currentNode.pos == end.toString()) {
        let cur = currentNode;
        var path: AStarNode[] = [];
        while (cur.parent) {
          path.push(cur);
          cur = cur.parent;
        }
        return path.reverse();
      }

      // Normal case
      delete openList[openListKeyList[lowestIndex]];
      closedList[currentNode.pos] = currentNode;

      let neighbors = this.neighbors(currentNode);

      for (let neighbor of neighbors) {
        const nPos = Point.fromString(neighbor.pos);
        if (closedList[neighbor.pos] || this.#memory[nPos.getY()][nPos.getX()] === '#') {
          // Wall or already closed - skip node
          continue;
        }

        let gNeighbor = currentNode.g + 1;
        let gScoreIsBest = false;

        if (!openList[neighbor.pos]) {
          // First time at this node
          gScoreIsBest = true;
          neighbor.h = this.heuristic(Point.fromString(neighbor.pos), end);
          openList[neighbor.pos] = neighbor;
        } else if (gNeighbor < neighbor.g) {
          // We already seen this node, but last time it had a worse g
          gScoreIsBest = true;
        }

        if (gScoreIsBest) {
          // Found the optimal path (so far)
          neighbor.parent = currentNode;
          neighbor.g = gNeighbor;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.debug = `F: ${neighbor.f}, G: ${neighbor.g}, H: ${neighbor.h}`;
        }
      }
    }

    return [];
  }

  neighbors(node: AStarNode) {
    const neighbors: AStarNode[] = [];
    const pos = Point.fromString(node.pos);

    for (let [y, x] of [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]) {
      if (this.#grid[pos.getY() + y] && this.#grid[pos.getY() + y][pos.getX() + x]) {
        neighbors.push(this.#grid[pos.getY() + y][pos.getX() + x]);
      }
    }
    return neighbors;
  }

  heuristic(a: Point, b: Point) {
    const dy = Math.abs(a.getY() - b.getY());
    const dx = Math.abs(a.getX() - b.getX());
    return dy + dx;
  }
}

export const partOne = (input: InputType, maxBytesToProcess: number = 1024, end: Point = new Point(70, 70)): number => {
  let MEM_SPACE = initializeMemorySpace(input, end.getX() + 1, end.getY() + 1, maxBytesToProcess);

  const aStart = new AStar(MEM_SPACE);
  const path = aStart.search(new Point(0, 0), end);

  return path.length;
};

export const partTwo = (input: InputType, maxBytesToProcess: number = 1024, end: Point = new Point(70, 70)): string => {
  const MAX_BYTES = input.length;
  let byteIndex = 1;

  let MEM_SPACE: Memory = [];

  for (; byteIndex < MAX_BYTES; byteIndex++) {
    console.log(`Checking ${byteIndex}/${MAX_BYTES}`);

    MEM_SPACE = initializeMemorySpace(input, end.getX() + 1, end.getY() + 1, byteIndex);
    const aStart = new AStar(MEM_SPACE);
    const path = aStart.search(new Point(0, 0), end);
    if (path.length === 0) {
      break;
    }
  }

  return input[byteIndex - 1];
};

export type PointType = {
  x: number;
  y: number;
  toString: () => string;
  add: (point: PointType) => PointType;
};

export default class Point {
  #x: number;
  #y: number;

  constructor(y: number = 0, x: number = 0) {
    this.#y = y;
    this.#x = x;
  }

  getX(): number {
    return this.#x;
  }

  getY(): number {
    return this.#y;
  }

  toString(): string {
    return `${this.#y}|${this.#x}`;
  }

  add(point: Point): Point {
    this.#y += point.getY();
    this.#x += point.getX();
    return this;
  }

  addDirections(y: number, x: number): Point {
    this.#y += y;
    this.#x += x;
    return this;
  }

  static addDirectionToPointString(point: string, y: number, x: number): string {
    return Point.fromString(point).addDirections(y, x).toString();
  }

  static fromString(point: string): Point {
    const p = point.split('|').map((n) => +n);
    return new Point(p[0], p[1]);
  }
}

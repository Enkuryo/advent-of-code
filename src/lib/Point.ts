export type PointType = {
  x: number;
  y: number;
  toString: () => string;
  add: (point: PointType) => PointType;
};

export default class Point {
  _x: number;
  _y: number;

  constructor(y: number, x: number) {
    this._y = y;
    this._x = x;
  }

  getX(): number {
    return this._x;
  }

  getY(): number {
    return this._y;
  }

  toString(): string {
    return `${this._y}|${this._x}`;
  }

  add(point: Point): Point {
    this._y += point.getY();
    this._x += point.getX();
    return this;
  }

  static fromString(point: string): Point {
    const p = point.split('|').map((n) => +n);
    return new Point(p[0], p[1]);
  }
}

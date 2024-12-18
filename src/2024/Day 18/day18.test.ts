import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day18';
import Point from '../../lib/Point';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day 18', () => {
  test('Part 1 - Example Input returns 22', () => {
    expect(partOne(EXAMPLE_INPUT, 12, new Point(6, 6))).toBe(22);
  });
  test('Part 2 - Example Input returns 6|1', () => {
    expect(partTwo(EXAMPLE_INPUT, 0, new Point(6, 6))).toBe('6,1');
  });
});

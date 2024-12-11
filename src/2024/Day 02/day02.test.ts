import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day02';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day 02', () => {
  test('Part 1 - Example Input returns 2', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(2);
  });
  test('Part 2 - Example Input returns 4', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(4);
  });
});

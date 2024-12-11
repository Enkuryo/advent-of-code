import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day11';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day 11', () => {
  test('Part 1 - Example Input returns 55312', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(55312);
  });

  test('Part 1 - Example Input returns 55312', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(55312);
  });
});

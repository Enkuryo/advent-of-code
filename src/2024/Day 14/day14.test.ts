import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day14';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day 14', () => {
  test('Part 1 - Example Input returns 12', () => {
    expect(partOne(EXAMPLE_INPUT, 11, 7)).toBe(12);
  });
  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});

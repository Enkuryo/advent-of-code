import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day16';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

const SMALL_EXAMPLE = `#####
###E#
###.#
#S..#
#####`.split('\n');

describe('Year 2024 - Day 16', () => {
  /*test('Part 1 - Example Input returns 1004', () => {
    expect(partOne(SMALL_EXAMPLE)).toBe(1004);
  });*/
  test('Part 1 - Example Input returns 7036', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(7036);
  });
  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});

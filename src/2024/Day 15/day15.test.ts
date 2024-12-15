import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day15';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

const SMALL_EXAMPLE_INPUT = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`.split('\n');

describe('Year 2024 - Day 15', () => {
  test('Part 1 - Small Example Input returns 2028', () => {
    expect(partOne(SMALL_EXAMPLE_INPUT)).toBe(2028);
  });
  test('Part 1 - Example Input returns 10092', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(10092);
  });
  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});

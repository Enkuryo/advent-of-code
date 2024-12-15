import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day15';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

const EDGE_CASE_1 = `#######
#.....#
#.OO@.#
#.....#
#######

<<`.split('\n');

const EDGE_CASE_2 = `#######
#.....#
#.O#..#
#..O@.#
#.....#
#######

<v<<^`.split('\n');

const EDGE_CASE_3 = `#######
#.....#
#.O.O@#
#..O..#
#..O..#
#.....#
#######

<v<<>vv<^^`.split('\n');

describe('Year 2024 - Day 15', () => {
  /*test('Part 1 - Small Example Input returns 2028', () => {
    expect(partOne(SMALL_EXAMPLE_INPUT)).toBe(2028);
  });
  test('Part 1 - Example Input returns 10092', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(10092);
  });*/
  test('Part 2 - Edge Cases', () => {
    //expect(partTwo(EDGE_CASE_1)).toBe(406);
    //expect(partTwo(EDGE_CASE_2)).toBe(509);
    expect(partTwo(EDGE_CASE_3)).toBe(822);
  });
  /*test('Part 2 - Example Input returns 9021', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(9021);
  });*/
});

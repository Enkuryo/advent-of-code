import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day22';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');
const EXAMPLE_2_INPUT = readFile(__dirname + '/example_2.txt');
const EXAMPLE_SHORT_INPUT = readFile(__dirname + '/example_short.txt');

console.clear();

describe('Year 2024 - Day 22', () => {
  /*test('Part 1 - Example Input returns 37327623', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(37327623);
  });*/

  /*test('Part 2 - Example Input returns 23', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(23);
  });*/
  /*test('Part 2 - Example Input returns 6', () => {
    expect(partTwo(EXAMPLE_SHORT_INPUT, 10)).toBe(6);
  });*/
  test('Part 2 - Example Input returns 23', () => {
    expect(partTwo(EXAMPLE_2_INPUT)).toBe(23);
  });
});

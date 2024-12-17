import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day17';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day 17', () => {
  test('Part 1 - Example Input returns 4,6,3,5,6,3,5,2,1,0', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe('4,6,3,5,6,3,5,2,1,0');
  });
  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});

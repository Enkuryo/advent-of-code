import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day13';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day 13', () => {
  test('Part 1 - Example Input returns 480', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(480);
  });
  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});

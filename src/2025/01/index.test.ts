import { describe, test, expect, beforeEach } from 'bun:test';
import Challenge from './index';

describe('Year 2025 - Day 01', () => {
  test('Part 1 - Example input returns 3', () => {
    const challenge = new Challenge(true);
    const result = challenge.partOne();
    expect(result).toBe(3);
  });

  test('Part 2 - Example input returns 6', () => {
    const challenge = new Challenge(true);
    const result = challenge.partTwo();
    expect(result).toBe(6);
  });
});

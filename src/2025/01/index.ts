import BaseChallenge from '@lib/BaseChallenge';

export default class Challenge extends BaseChallenge {
  override getPath(): string {
    return __dirname;
  }

  override partOne(): number {
    const rotations: number[] = this.parseInput(this.getPuzzleInput());
    let currentPosition = 50;
    let timesZeroHit = 0;

    for (const dist of rotations) {
      currentPosition = (((currentPosition + dist) % 100) + 100) % 100;
      if (currentPosition === 0) timesZeroHit++;
    }
    return timesZeroHit;
  }

  override partTwo(): number {
    throw new Error('Feature not implemented yet');
  }

  parseInput(input: string[]): number[] {
    return input.map((line) => parseInt(line.substring(1), 10) * (line.substring(0, 1) === 'R' ? 1 : -1));
  }
}

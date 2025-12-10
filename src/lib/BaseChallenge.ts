import fs from 'fs';
import path from 'path';

export default abstract class BaseChallenge {
  #example: string[] = [];
  #input: string[] = [];

  abstract getPath(): string;

  abstract partOne(): number;

  abstract partTwo(): number;

  constructor() {
    this.load();
  }

  load(): void {
    // Load the example file - if exists
    const exampleFilePath = path.join(this.getPath(), 'example.txt');
    if (fs.existsSync(exampleFilePath)) {
      this.#example = fs.readFileSync(exampleFilePath, { encoding: 'utf8', flag: 'r' }).split(/\r?\n/) ?? [];
    }

    // Load the input file - if exists
    const inputFilePath = path.join(this.getPath(), 'input.txt');
    if (fs.existsSync(inputFilePath)) {
      this.#input = fs.readFileSync(inputFilePath, { encoding: 'utf8', flag: 'r' }).split(/\r?\n/) ?? [];
    }
  }

  getExampleInput(): string[] {
    return this.#example;
  }

  getPuzzleInput(): string[] {
    return this.#input;
  }
}

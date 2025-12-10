import fs from 'fs';
import path from 'path';

export default abstract class BaseChallenge {
  #input: string[] = [];

  abstract getPath(): string;

  abstract partOne(): number;

  abstract partTwo(): number;

  constructor(example: boolean = false) {
    this.load(example);
  }

  load(loadExampleFile: boolean): void {
    if (loadExampleFile) {
      // Load the example file - if exists
      const exampleFilePath = path.join(this.getPath(), 'example.txt');
      if (fs.existsSync(exampleFilePath)) {
        this.#input = fs.readFileSync(exampleFilePath, { encoding: 'utf8', flag: 'r' }).split(/\r?\n/) ?? [];
      }
    } else {
      // Load the input file - if exists
      const inputFilePath = path.join(this.getPath(), 'input.txt');
      if (fs.existsSync(inputFilePath)) {
        this.#input = fs.readFileSync(inputFilePath, { encoding: 'utf8', flag: 'r' }).split(/\r?\n/) ?? [];
      }
    }
  }

  getPuzzleInput(): string[] {
    return this.#input;
  }
}

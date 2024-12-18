import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

class Computer {
  #registerA: number;
  #registerB: number;
  #registerC: number;
  #program: number[];
  #result: number[];
  #programCounter: number;

  constructor() {
    this.#registerA = 0;
    this.#registerB = 0;
    this.#registerC = 0;
    this.#program = [];
    this.#result = [];
    this.#programCounter = 0;
  }

  static fromInputString(input: InputType): Computer {
    const c = new Computer();
    for (let line of input) {
      const [key, value] = line.split(': ');
      switch (key) {
        case 'Register A':
          c.setRegisterA(+value);
          break;
        case 'Register B':
          c.setRegisterB(+value);
          break;
        case 'Register C':
          c.setRegisterC(+value);
          break;
        case 'Program':
          c.setProgram(value.split(',').map((n) => +n));
          break;
      }
    }
    return c;
  }

  run(runUntilEndOfProgram: boolean = false): Computer {
    const opcode = this.#program[this.#programCounter];
    const operand = this.#program[this.#programCounter + 1];

    switch (opcode) {
      case 0:
        this.#adv(operand);
        break;
      case 1:
        this.#bxl(operand);
        break;
      case 2:
        this.#bst(operand);
        break;
      case 3:
        this.#jnz(operand);
        break;
      case 4:
        this.#bxc();
        break;
      case 5:
        this.#out(operand);
        break;
      case 6:
        this.#bdv(operand);
        break;
      case 7:
        this.#cdv(operand);
        break;
    }

    if (runUntilEndOfProgram && !this.endOfProgram()) {
      this.run(runUntilEndOfProgram);
    }

    return this;
  }

  endOfProgram(): boolean {
    return this.#programCounter >= this.#program.length;
  }

  #next(): void {
    this.#programCounter += 2;
  }

  #getValueOfCombo(combo: number): number {
    switch (combo) {
      case 4:
        return this.#registerA;
      case 5:
        return this.#registerB;
      case 6:
        return this.#registerC;
    }
    return combo;
  }

  #adv(combo: number): void {
    this.#registerA = Math.floor(
      this.#registerA / Math.pow(2, this.#getValueOfCombo(combo))
    );
    this.#next();
  }

  #bxl(literal: number): void {
    this.#registerB = (this.#registerB ^ literal) >>> 0;
    this.#next();
  }

  #bst(combo: number): void {
    this.#registerB = this.#getValueOfCombo(combo) % 8;
    this.#next();
  }

  #jnz(literal: number): void {
    this.#next();
    if (this.#registerA !== 0) {
      this.#programCounter = literal;
    }
  }

  #bxc(): void {
    this.#registerB = (this.#registerB ^ this.#registerC) >>> 0;
    this.#next();
  }

  #out(combo: number): void {
    this.#result.push(this.#getValueOfCombo(combo) % 8 >>> 0);
    this.#next();
  }

  #bdv(combo: number): void {
    this.#registerB = Math.floor(
      this.#registerA / Math.pow(2, this.#getValueOfCombo(combo))
    );
    this.#next();
  }

  #cdv(combo: number): void {
    this.#registerC = Math.floor(
      this.#registerA / Math.pow(2, this.#getValueOfCombo(combo))
    );
    this.#next();
  }

  setRegisterA(value: number): Computer {
    this.#registerA = value;
    return this;
  }

  setRegisterB(value: number): Computer {
    this.#registerB = value;
    return this;
  }

  setRegisterC(value: number): Computer {
    this.#registerC = value;
    return this;
  }

  setProgram(value: number[]): Computer {
    this.#program = value;
    return this;
  }

  getInfo(includeProgram: boolean = false): void {
    const regA = `Register A: ${this.#registerA}\n`;
    const regB = `Register B: ${this.#registerB}\n`;
    const regC = `Register C: ${this.#registerC}\n`;
    const prog = `\nProgram: ${this.#program.join(',')}\n`;
    const res = `\nResult: ${this.#result.join(',')}\n`;

    console.log(`${regA}${regB}${regC}${includeProgram ? prog : ''}${res}`);
  }

  getResult(): string {
    return this.#result.join(',');
  }
}

export const partOne = (input: InputType): string => {
  const computer = Computer.fromInputString(input);

  computer.run(true);

  return computer.getResult();
};

export const partTwo = (input: InputType): number => {
  return -1;
};

import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

class Computer {
  #registerA: bigint;
  #registerB: bigint;
  #registerC: bigint;
  #program: number[];
  #result: number[];
  #programCounter: number;
  #debug: boolean;

  constructor() {
    this.#registerA = BigInt(0);
    this.#registerB = BigInt(0);
    this.#registerC = BigInt(0);
    this.#program = [];
    this.#result = [];
    this.#programCounter = 0;
    this.#debug = false;
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

  setDebug(debug: boolean): void {
    this.#debug = debug;
  }

  reset(): void {
    this.#registerA = BigInt(0);
    this.#registerB = BigInt(0);
    this.#registerC = BigInt(0);
    this.#result = [];
    this.#programCounter = 0;
  }

  run(runUntilEndOfProgram: boolean = false): Computer {
    const opcode = this.#program[this.#programCounter];
    const operand = this.#program[this.#programCounter + 1];

    if (this.#debug) console.log({ opcode, operand });

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

  #getValueOfCombo(combo: number): bigint {
    switch (combo) {
      case 4:
        return this.#registerA;
      case 5:
        return this.#registerB;
      case 6:
        return this.#registerC;
    }
    return BigInt(combo);
  }

  #adv(combo: number): void {
    this.#registerA = this.#registerA / 2n ** this.#getValueOfCombo(combo);
    this.#next();
  }

  #bxl(literal: number): void {
    this.#registerB = this.#registerB ^ BigInt(literal);
    this.#next();
  }

  #bst(combo: number): void {
    this.#registerB = this.#getValueOfCombo(combo) % 8n;
    this.#next();
  }

  #jnz(literal: number): void {
    this.#next();
    if (this.#registerA !== 0n) {
      this.#programCounter = literal;
    }
  }

  #bxc(): void {
    let r = BigInt(this.#registerB) ^ BigInt(this.#registerC);
    this.#registerB = r;
    this.#next();
  }

  #out(combo: number): void {
    this.#result.push(Number(this.#getValueOfCombo(combo) % 8n));
    this.#next();
  }

  #bdv(combo: number): void {
    this.#registerB = this.#registerA / 2n ** this.#getValueOfCombo(combo);
    this.#next();
  }

  #cdv(combo: number): void {
    this.#registerC = this.#registerA / 2n ** this.#getValueOfCombo(combo);
    this.#next();
  }

  setRegisterA(value: bigint): Computer {
    this.#registerA = value;
    return this;
  }

  getRegisterA(): bigint {
    return this.#registerA;
  }

  setRegisterB(value: bigint): Computer {
    this.#registerB = value;
    return this;
  }

  setRegisterC(value: bigint): Computer {
    this.#registerC = value;
    return this;
  }

  setProgram(value: number[]): Computer {
    this.#program = value;
    return this;
  }

  getInfo(includeProgram: boolean = false, includeResult: boolean = false): void {
    const regA = `Register A: ${this.#registerA} `;
    const regB = `Register B: ${this.#registerB} `;
    const regC = `Register C: ${this.#registerC} `;
    const prog = `\nProgram: ${this.#program.join(',')}\n`;
    const res = `\nResult: ${this.#result.join(',')}\n`;

    console.log(`${regA}${regB}${regC}${includeProgram ? prog : ''}${includeResult ? res : ''}`);
  }

  getProgram(slice: number | undefined = undefined): number[] {
    return this.#program.slice(slice);
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

export const partTwo = (input: InputType): string => {
  const computer = Computer.fromInputString(input);

  let counter = computer.getProgram().length - 1;
  let offsets: [bigint, number][] = [[0n, counter]];

  while (offsets.length > 0) {
    let [offset, counter]: [bigint, number] = offsets.shift() ?? [0n, 0];

    const target = computer.getProgram(counter).join(',');

    console.clear();
    console.log('Overall program is', computer.getProgram().join(','));
    console.log('Looking for', target);
    for (let i = 0; i < 8; i++) {
      const input = (offset << 3n) + BigInt(i);

      console.log('Trying with input', input);
      computer.reset();
      computer.setRegisterA(BigInt(input));
      computer.getInfo();

      computer.run(true);
      computer.getInfo();
      console.log('Result:', computer.getResult(), target === computer.getResult() ? '<-- MATCH' : '', '\n');

      if (target === computer.getResult()) {
        if (counter == 0) {
          return `` + input;
        }

        offsets.push([input, counter - 1]);
      }
    }
    console.log('Now we check', offsets);
    prompt();
  }

  return 'No solution found :(';
};

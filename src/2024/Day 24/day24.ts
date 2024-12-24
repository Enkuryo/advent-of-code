import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type RegisterType = { [key: string]: number };
type CalculationType = { input1: string; input2: string; ops: string; output: string };

const AND = (n1: number, n2: number): number => n1 & n2;
const OR = (n1: number, n2: number): number => n1 | n2;
const XOR = (n1: number, n2: number): number => n1 ^ n2;

const parseInput = (input: InputType): { registers: RegisterType; calculations: CalculationType[] } => {
  const registers: RegisterType = {};
  const calculations: CalculationType[] = [];

  for (let line of input) {
    if (line.match(/^[yx]\d+: \d+$/)) {
      let parts = line.split(': ');
      registers[parts[0]] = +parts[1];
    } else if (line !== '') {
      const [_, input1, ops, input2, output] = line.match(/([\w\d]+) (AND|XOR|OR) ([\w\d]+) -> ([\w\d]+)/) ?? [];
      calculations.push({
        input1,
        input2,
        ops,
        output,
      });
    }
  }

  return {
    registers,
    calculations,
  };
};

const calculate = (registers: RegisterType, calculations: CalculationType[]): RegisterType => {
  while (calculations.length > 0) {
    let nextCalculation = calculations.shift();
    if (!nextCalculation) throw 'How?';

    // If not both inputs exists, push the calculation back to the stack
    if (registers[nextCalculation.input1] === undefined || registers[nextCalculation.input2] === undefined) {
      calculations.push(nextCalculation);
      continue;
    }

    const input1 = registers[nextCalculation.input1];
    const input2 = registers[nextCalculation.input2];

    switch (nextCalculation.ops) {
      case 'AND':
        registers[nextCalculation.output] = AND(input1, input2);
        break;
      case 'OR':
        registers[nextCalculation.output] = OR(input1, input2);
        break;
      case 'XOR':
        registers[nextCalculation.output] = XOR(input1, input2);
        break;
    }
  }

  return registers;
};

const getResult = (registers: RegisterType): number => {
  let result = Object.keys(registers)
    .filter((key) => /^z\d+$/.test(key))
    .sort((a, b) => a.localeCompare(b))
    .reverse()
    .map((key) => registers[key])
    .join('');
  return parseInt(result, 2);
};

export const partOne = (input: InputType): number => {
  let { registers, calculations } = parseInput(input);
  registers = calculate(registers, calculations);
  return getResult(registers);
};

export const partTwo = (input: InputType): number => {
  return -1;
};

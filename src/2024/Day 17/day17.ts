import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

let registerA: number = 0;
let registerB: number = 0;
let registerC: number = 0;
let programm: number[] = [];
let result: number[] = [];

const getValueOfComboOperand = (operand: number): number => {
  switch (operand) {
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return registerA;
    case 5:
      return registerB;
    case 6:
      return registerC;
  }
  return -1;
};

export const partOne = (input: InputType): string => {
  for (let line of input) {
    if (line === '') continue;
    const [key, value] = line.split(': ');

    if (key.endsWith('A')) {
      registerA = +value;
    } else if (key.endsWith('B')) {
      registerB = +value;
    } else if (key.endsWith('C')) {
      registerC = +value;
    } else {
      programm = value.split(',').map((n) => +n);
    }
  }

  for (let i = 0; i < programm.length; ) {
    const opcode = programm[i];
    const operand = programm[i + 1];

    switch (opcode) {
      case 0: // adv
        registerA = Math.floor(
          registerA / Math.pow(2, getValueOfComboOperand(operand))
        );
        break;
      case 1: // bxl
        registerB = registerB ^ operand;
        break;
      case 2: // bst
        registerB = getValueOfComboOperand(operand) % 8;
        break;
      case 3: // jnz
        if (registerA !== 0) {
          i = operand;
        } else {
          i += 2;
        }
        break;
      case 4: // bxc
        registerB = registerB ^ registerC;
        break;
      case 5: // out
        result.push(getValueOfComboOperand(operand) % 8);
        break;
      case 6: // bdv
        registerB = Math.floor(
          registerA / Math.pow(2, getValueOfComboOperand(operand))
        );
        break;
      case 7: // cdv
        registerC = Math.floor(
          registerA / Math.pow(2, getValueOfComboOperand(operand))
        );
        break;
    }

    if (opcode !== 3) {
      i += 2;
    }
  }

  return result.join(',');
};

export const partTwo = (input: InputType): number => {
  return -1;
};

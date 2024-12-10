import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type ExpressionType = {
  result: number;
  values: number[];
};

const decToBitString = (input: number, length: number): string => {
  return (input >>> 0).toString(2).padStart(length, '0');
};

const decToTriString = (input: number, length: number): string => {
  return (input >>> 0).toString(3).padStart(length, '0');
};

export const partOne = (input: InputType): number => {
  const inputs: ExpressionType[] = input.map((i) => {
    const [result, values] = i.split(': ');
    return {
      result: +result,
      values: values.split(' ').map((n) => +n),
    };
  });

  let result = 0;

  for (let line of inputs) {
    for (let ops = 0; ops < Math.pow(2, line.values.length - 1); ops++) {
      let operations = decToBitString(ops, line.values.length - 1)
        .split('')
        .map((n) => (n === '0' ? '+' : '*'));

      let r = line.values[0];

      for (let i = 0; i < operations.length; i++) {
        if (operations[i] === '+') {
          r += line.values[i + 1];
        } else {
          r *= line.values[i + 1];
        }
      }

      if (r === line.result) {
        result += line.result;
        break;
      }
    }
  }

  return result;
};

export const partTwo = (input: InputType): number => {
  const inputs: ExpressionType[] = input.map((i) => {
    const [result, values] = i.split(': ');
    return {
      result: +result,
      values: values.split(' ').map((n) => +n),
    };
  });

  let result = 0;

  for (let line of inputs) {
    for (let ops = 0; ops < Math.pow(3, line.values.length - 1); ops++) {
      let r = decToTriString(ops, line.values.length - 1)
        .split('')
        .reduce((a, b, i) => {
          switch (+b) {
            case 0:
              return a + line.values[i + 1];
            case 1:
              return a * line.values[i + 1];
            default:
              return +`${a}${line.values[i + 1]}`;
          }
        }, line.values[0]);

      if (r === line.result) {
        result += line.result;
        break;
      }
    }
  }

  return result;
};

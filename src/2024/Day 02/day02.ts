import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

const isReportValid = (report: number[]): boolean => {
  const ascending = report[0] < report[1];
  let reportIsSafe = true;

  for (let i = 0; i < report.length - 1; i++) {
    if (
      (!ascending && report[i] < report[i + 1]) ||
      (ascending && report[i] > report[i + 1])
    ) {
      reportIsSafe = false;
      break;
    }

    const diff = Math.abs(report[i] - report[i + 1]);
    if (diff < 1 || diff > 3) {
      reportIsSafe = false;
      break;
    }
  }

  return reportIsSafe;
};

export const partOne = (input: InputType): number => {
  const reports = input.map((line) => line.split(' ').map((n) => +n));

  let safeReports = 0;

  for (let report of reports) {
    if (isReportValid(report)) safeReports++;
  }

  return safeReports;
};

export const partTwo = (input: InputType): number => {
  const reports = input.map((line) => line.split(' ').map((n) => +n));

  let safeReports = 0;

  for (let report of reports) {
    let couldReportBeSafe = false;
    for (let removeAt = 0; removeAt < report.length; removeAt++) {
      let reportToCheck = [...report];
      reportToCheck.splice(removeAt, 1);
      couldReportBeSafe = couldReportBeSafe || isReportValid(reportToCheck);
    }
    if (couldReportBeSafe) safeReports++;
  }

  return safeReports;
};

import fs from 'fs';

export type InputType = string[];

/**
 * Read the given file and returns it as an array of strings
 * @param path - The path to the file
 * @returns string[]
 */
export const readFile = (path: string): InputType => {
  if (!fs.existsSync(path)) {
    console.error(`File ${path} does not exist.`);
    return [];
  }

  const content = fs.readFileSync(path, 'utf-8');
  return content.split('\n');
};

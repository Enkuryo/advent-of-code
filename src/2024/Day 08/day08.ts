import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

const inBounds = (y: number, x: number, map: Array<Array<string>>): boolean => {
    return y >= 0 && x >= 0 && y < map.length && x < map[y].length;
};

const printMap = (map: Array<Array<string>>): string => {
    return map.map((l) => l.join('')).join('\n');
};

export const partOne = (input: InputType): number => {
    let distinctLocations = new Set<string>();

    const map = input.map((line) => line.split(''));
    const resultMap = JSON.parse(JSON.stringify(map));

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] !== '.') {
                const antenna = map[y][x];

                for (let yy = 0; yy < map.length; yy++) {
                    for (let xx = 0; xx < map[yy].length; xx++) {
                        if (y == yy && x == xx) continue;
                        if (antenna === map[yy][xx]) {
                            const offsetX = x + (x - xx);
                            const offsetY = y + (y - yy);

                            const location = `${offsetY}|${offsetX}`;

                            if (
                                inBounds(offsetY, offsetX, map) &&
                                !distinctLocations.has(location)
                            ) {
                                distinctLocations.add(location);
                                resultMap[offsetY][offsetX] = '#';
                            }
                        }
                    }
                }
            }
        }
    }

    return distinctLocations.size;
};

export const partTwo = (input: InputType): number => {
    let distinctLocations = new Set<string>();

    const map = input.map((line) => line.split(''));
    const resultMap = JSON.parse(JSON.stringify(map));

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] !== '.') {
                const antenna = map[y][x];

                for (let yy = 0; yy < map.length; yy++) {
                    for (let xx = 0; xx < map[yy].length; xx++) {
                        if (y == yy && x == xx) continue;
                        if (antenna === map[yy][xx]) {
                            const offsetX = x - xx;
                            const offsetY = y - yy;
                            let cOffX = x - offsetX;
                            let cOffY = y - offsetY;

                            while (inBounds(cOffY, cOffX, map)) {
                                const location = `${cOffY}|${cOffX}`;
                                if (!distinctLocations.has(location)) {
                                    distinctLocations.add(location);
                                    resultMap[cOffY][cOffX] = '#';
                                }
                                cOffX -= offsetX;
                                cOffY -= offsetY;
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(printMap(map));
    console.log();
    console.log(printMap(resultMap));

    return distinctLocations.size;
};

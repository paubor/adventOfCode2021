import fs from 'fs';

const getDayNumberFromPath = (path: string): number => {
    const match = path.match(/day(\d)/);
    if(match && match.length > 1) {
        return Number(match[1]);
    }
    throw Error("Could not parse number from path")
}

const getLines = (dayNumber: number, filename: string = "input.txt"): string[] => {
    const raw = fs.readFileSync(`src/day${dayNumber}/${filename}`, 
        'utf-8');
    return raw.split("\n");
}

const getIntLines = (dayNumber: number, sorted: boolean = false, filename: string = "input.txt" ): number[] => {
    const numbers = getLines(dayNumber, filename)
    .map((s, l) => {
        const i = parseInt(s, 10);
        if(isNaN(i)) {
            console.log("Line", l, "CAUSED NAN: ", s);
        }
        return i;
    });
    return numbers;
}

export { getLines, getIntLines, getDayNumberFromPath }
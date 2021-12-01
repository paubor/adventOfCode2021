import { getDayNumberFromPath, getIntLines } from "../shared/utils";

const DAY = getDayNumberFromPath(__dirname);

type DepthMeasurementType = "N/A" | "INCREASE" | "DECREASE";

interface Measurement {
    previousElevation: number;
    history: Array<DepthMeasurementType>;
    increases: number;
    decreases: number;
}

const rawMeasurements = getIntLines(DAY);

const getDepthMeasurementType = (a: number, b: number): DepthMeasurementType => {
    if(a < b) {
        return "INCREASE";
    }
    if(a > b) {
        return "DECREASE";
    }
    return "N/A"
}

const getProcessedMeasurements = (raw: number[]): Measurement =>  
    raw.reduce<Measurement>((acc, currentMeasurement) => {
        const type =  getDepthMeasurementType(acc.previousElevation, currentMeasurement);
        return {
        previousElevation: currentMeasurement,
        history: [...acc.history, type],
        increases: acc.increases + (type === "INCREASE" ? 1 : 0),
        decreases: acc.decreases + (type === "DECREASE" ? 1 : 0)
    };
}, {
        history: [],
        previousElevation: raw[0],
        increases: 0,
        decreases: 0
    })

export const part1 = () => {
    return getProcessedMeasurements(rawMeasurements).increases;
}


export const part2 = () => {
    const windowedRawMeasurements = rawMeasurements.reduce<Array<number>>((acc, m, idx) => {
        return [idx-2,idx-1,idx].reduce((innerAcc, realIndex) => {
            if(realIndex >= 0) {
                return [
                    ...innerAcc.slice(0, realIndex),
                    (innerAcc[realIndex] ?? 0) + m,
                    ...innerAcc.slice(realIndex+1)
                ]
            }
            return innerAcc;
        }, acc);
    }, []);
    
    return getProcessedMeasurements(windowedRawMeasurements).increases;
}


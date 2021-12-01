if(process.argv.length != 3) {
    throw new Error("Should run with npm run dev <number>")
}
const day = process.argv[2];
async function getDayProgram() {
    const result =  await import(`./day${day}/solution`);
    return result as {
        part1: () => number;
        part2?: () => number
    };
}

console.log(__filename);

getDayProgram()
.then(program =>{
    console.log("RUNNING DAY "+day)
    console.log("RESULT PART 1: ", program.part1());
    if(program.part2) {
        console.log("RESULT PART 2: ", program.part2())
    }
})
.catch(e => console.error("Problem while running...", e));
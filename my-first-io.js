const fs = require("fs");
const file = process.argv[2];

const lines = fs.readFileSync(file, "utf-8").split("\n");
console.log(lines.length - 1);

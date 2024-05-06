const fs = require("fs");
const file = process.argv[2];

function countLines(err, fileContents) {
  if (err) {
    return `Error reading file ${file}: ${fileContents}`;
  }
  const lines = fileContents.split("\n");
  const linesCount = lines.length - 1;
  console.log(linesCount);
  return linesCount;
}

fs.readFile(file, "utf-8", countLines);

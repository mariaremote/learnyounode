const fs = require("fs");
const filePath = process.argv[2];
const fileExtension = `.${process.argv[3]}`;

fs.readdir(filePath, (err, fileList) => {
  if (err) {
    return `Can't read path ${filePath}, ${err}.`;
  }
  const filteredList = fileList.filter((item) =>
    item.endsWith(fileExtension) ? true : false
  );
  const listOutput = filteredList.join("\n");
  console.log(listOutput);
  return filteredList;
});

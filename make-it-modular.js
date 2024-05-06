const filter = require("./mymodule");
const filePath = process.argv[2];
const fileExtension = process.argv[3];

filter(filePath, fileExtension, (err, filteredList) => {
  if (err) return console.error(err);
  filteredList.forEach((file) => console.log(file));
});

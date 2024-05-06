const filterForFileExtension = function (filePath, fileExtension, callback) {
  const fs = require("fs");
  fs.readdir(filePath, (err, files) => {
    if (err) {
      //   console.log`There was an error reading file path ${filePath}`;
      return callback(err);
    }
    const filteredList = files.filter((file) =>
      file.endsWith(`.${fileExtension}`)
    );
    return callback(null, filteredList);
  });
};
module.exports = filterForFileExtension;

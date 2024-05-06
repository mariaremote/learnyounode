const http = require("http");
const url = process.argv[2];
const output = [];

http
  .get(url, (response) => {
    response.setEncoding("utf-8");
    response.on("data", (data) => {
      output.push(data);
    });
    response.on("error", (err) => {
      console.log(err);
    });
    response.on("end", () => {
      console.log(output.join("").length);
      console.log(output.join(""));
    });
  })
  .on("error", (err) => {
    console.log(err);
  });

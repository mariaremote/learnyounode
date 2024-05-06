const http = require("http");
const url = process.argv[2];
console.log(url);
// function callback(response) {
//   //   if (err) {
//   //     return err;
//   //   }
//   console.log(response);
//   response.on("data", (data) => console.log(data.setEncoding("utf-8")));
// }

const response = http.get(url, (response) => {
  response.on("error", (err) => console.log(err));
  response.on("data", (data) => {
    console.log(data.toString());
  });
});

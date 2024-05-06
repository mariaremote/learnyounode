// const http = require("http");
// const async = require("async");
// const urls = process.argv.slice(2);
// let contentsArray = [];

// bad practice (callback hell)
// http.get(urls[0], (content) => {
//   let text = [];
//   content.on("data", (data) => {
//     text.push(data.toString());
//   });
//   content.on("end", () => {
//     console.log(text.join(""));
//     http.get(urls[1], (content) => {
//       let text = [];
//       content.on("data", (data) => {
//         text.push(data.toString());
//       });
//       content.on("end", () => {
//         console.log(text.join(""));
//         http.get(urls[2], (content) => {
//           let text = [];
//           content.on("data", (data) => {
//             text.push(data.toString());
//           });
//           content.on("end", () => {
//             console.log(text.join(""));
//           });
//         });
//       });
//     });
//   });
// });

// using async
// async.eachSeries(urls, (url, callback) => {
//   http.get(url, (content) => {
//     let text = [];
//     content.on("data", (data) => {
//       text.push(data.toString());
//     });
//     content.on("end", () => {
//       console.log(text.join(""));
//       callback();
//     });
//   });
// });

// official solution
const http = require("http");
const bl = require("bl");
const results = [];
let count = 0;

function printResults() {
  for (let i = 0; i < 3; i++) {
    console.log(results[i]);
  }
}

function httpGet(index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(
      bl(function (err, data) {
        if (err) {
          return console.error(err);
        }

        results[index] = data.toString();
        count++;

        if (count === 3) {
          printResults();
        }
      })
    );
  });
}

for (let i = 0; i < 3; i++) {
  httpGet(i);
}

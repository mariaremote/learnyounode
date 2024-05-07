const http = require("http");
const async = require("async");
const urls = process.argv.slice(2);
const apiURLs = [
  "https://api.weather.gov/gridpoints/OKX/35,35/forecast",
  "https://api.weather.gov/gridpoints/OKX/25,25/forecast",
  "https://api.weather.gov/gridpoints/OKX/15,15/forecast",
];
let contentsArray = [];

// TODO: write as Promise!

function getURLcontent(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (content) => {
      let text = [];
      content.on("data", (data) => {
        text.push(data.toString());
      });
      content.on("end", () => {
        resolve(text.join(""));
      });
      content.on("error", (err) => reject(err));
    });
  });
}
function collectContents(content) {
  return new Promise((resolve, reject) => {
    contentsArray.push(content);
    resolve("got content");
    reject("error");
  });
}
function printAll(stuff) {
  stuff.forEach((item) => console.log(item));
}
Promise.all(
  apiURLs.map((each) => getURLcontent(each).then(collectContents))
).then(() => printAll(contentsArray));

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
// const http = require("http");
// const bl = require("bl");
// const results = [];
// let count = 0;

// function printResults() {
//   for (let i = 0; i < 3; i++) {
//     console.log(results[i]);
//   }
// }

// function httpGet(index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(
//       bl(function (err, data) {
//         if (err) {
//           return console.error(err);
//         }

//         results[index] = data.toString();
//         count++;

//         if (count === 3) {
//           printResults();
//         }
//       })
//     );
//   });
// }

// for (let i = 0; i < 3; i++) {
//   httpGet(i);
// }

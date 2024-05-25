const http = require("http");
const urls = process.argv.slice(2);
let count = 0;
let contentsArray = [];

// using promises
function getURLcontent(urlIndex) {
  let url = urls[urlIndex];
  return new Promise((resolve, reject) => {
    http.get(url, (content) => {
      let text = [];
      content.on("data", (data) => {
        text.push(data.toString());
      });
      content.on("end", () => {
        contentsArray[urlIndex] = text.join("");
        resolve();
      });
      content.on("error", (error) => {
        reject(`Error fetching data from ${url}\n${error}`);
      });
    });
  });
}

for (let i = 0; i < urls.length; i++) {
  getURLcontent(i)
    .then(() => {
      count++;
      if (count === urls.length) {
        contentsArray.forEach((content) => {
          console.log(content);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

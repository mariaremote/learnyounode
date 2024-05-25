const http = require("http");
const urls = process.argv.slice(2);
let contentsArray = [];

// using async await
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

// from codecademy
async function serveDinnerAgain() {
  let foodArray = await Promise.all([
    steamBroccoli(),
    cookRice(),
    bakeChicken(),
    cookBeans(),
  ]);
  console.log(
    `Dinner is served. We're having ${foodArray[0]}, ${foodArray[1]}, ${foodArray[2]}, and ${foodArray[3]}.`
  );
}
serveDinnerAgain();

let cookBeans = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("beans");
    }, 1000);
  });
};

let steamBroccoli = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("broccoli");
    }, 1000);
  });
};

let cookRice = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("rice");
    }, 1000);
  });
};

let bakeChicken = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("chicken");
    }, 1000);
  });
};

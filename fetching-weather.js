// TODO: first get all temperatures, and then sort them and return in order (highest first) before printing them

const locations = {
  chicago: {
    url: "https://api.open-meteo.com/v1/forecast?latitude=41.8781&longitude=-87.6298&current_weather=true",
    temp: 0,
  },
  edinburgh: {
    url: "https://api.open-meteo.com/v1/forecast?latitude=55.9533&longitude=-3.1883&current_weather=true",
    temp: 0,
  },
  berlin: {
    url: "https://api.open-meteo.com/v1/forecast?latitude=52.5200&longitude=13.4050&current_weather=true",
    temp: 0,
  },
};

function getURLcontent(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        response.json().then((data) => {
          resolve(data);
        });
      })
      .catch((error) => {
        reject(`Error fetching data from ${url}\n${error}`);
      });
  });
}

function assignTemp(data, location) {
  return new Promise((resolve, reject) => {
    locations[location].temp = data.current_weather.temperature;
    resolve();
    reject("Error assigning temperature");
  });
}

function sortTemps() {
  return Object.entries(locations).sort((a, b) => b[1].temp - a[1].temp);
}

const promises = Object.entries(locations).map(
  ([location, locationDetails]) => {
    return getURLcontent(locationDetails.url)
      .then((data) => assignTemp(data, location))
      .then(sortTemps);
  }
);

Promise.all(promises)
  .then(() => {
    console.log(locations);
  })
  .catch((error) => {
    console.error(error);
  });

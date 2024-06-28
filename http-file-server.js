const fs = require("fs");
const http = require("http");
const port = process.argv[2];
const file = process.argv[3];

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(file, { encoding: "utf-8" });
  stream.pipe(res);
  //   res.write(fs.readFileSync(file));
  //   console.log(res);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

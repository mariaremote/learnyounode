const http = require("http");
const port = process.argv[2];
const map = require("through2-map");

function upperCase(chunk) {
  return chunk.toString().toUpperCase();
}

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    req.pipe(map(upperCase)).pipe(res);
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

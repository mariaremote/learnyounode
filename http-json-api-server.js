const http = require("http");
const port = process.argv[2];

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = new URL(req.url, `http://${req.headers.host}`);
  const isoFormat = url.searchParams.get("iso");
  // const date = new Date("2024-06-30T03:20:20.670Z");
  const dateTime = new Date(isoFormat);

  // hour-minute-second route
  if (method === "GET" && url.pathname === "/api/parsetime") {
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    let hhmmss = { hour: hours, minute: minutes, second: seconds };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(hhmmss));
  }

  // unixtime route
  if (method === "GET" && url.pathname === "/api/unixtime") {
    let unixtime = { unixtime: dateTime.getTime() };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(unixtime));
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

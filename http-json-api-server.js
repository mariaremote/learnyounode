const http = require("http");
const port = process.argv[2] || 8080;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const isoFormat = url.searchParams.get("iso");
  // const date = new Date("2024-06-30T03:20:20.670Z");
  const dateTime = new Date(isoFormat);

  // parsetime route
  if (req.method === "GET" && url.pathname === "/api/parsetime") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        hour: dateTime.getHours(),
        minute: dateTime.getMinutes(),
        second: dateTime.getSeconds(),
      })
    );
  }
  // unixtime route
  if (req.method === "GET" && url.pathname === "/api/unixtime") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ unixtime: dateTime.getTime() }));
  }
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end(`${url.pathname} not found`);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const net = require("net");
const strftime = require("strftime");
const port = process.argv[2];
const serverConfig = { host: "localhost", port: port || 8080 };
const server = net.createServer();

const format = "%F %H:%M";
let today = new Date();
const dateString = strftime(format, today) + "\n";

server.on("connection", (socket) => {
  // console.log("S: Client connected");
  // socket.write("S: Welcome to this Server!");
  socket.write(dateString);
  socket.end();
});
server.on("data", (data) => {
  console.log(data.toString());
});
server.on("end", () => {
  console.log("S: Server closed connection");
});

server.listen(serverConfig, () => {
  console.log(
    `Server is listening on ${serverConfig.host}:${serverConfig.port}`
  );
});

module.exports = { serverConfig };

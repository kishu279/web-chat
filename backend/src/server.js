require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { WebSocketServer } = require("ws");

const userRoutes = require("./Routes/userRoutes");
const { mssgSchema } = require("./schema/userData");

const app = express();
const server = http.createServer(app);
app.use(express.json());
const wss1 = new WebSocketServer({ noServer: true });

// CORS APPLIED
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://192.168.214.158:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

async function main() {
  server.listen(3000, () => {
    console.log("server is listening on port 3000");
  });

  await mongoose.connect(process.env.DB_URL).then(() => {
    console.log("db connected !!!");
  });
}

app.get("/", (req, res) => {
  res.send("server is running perfectly");
});

app.use("/user", userRoutes);

wss1.on("connection", (ws) => {
  console.log("Connected !!!");
  ws.on("error", (error) => {
    console.log(error);
  });

  ws.on("close", () => {
    console.log("Connecion is closed");
  });

  ws.on("message", (event) => {
    const result = mssgSchema.safeParse(JSON.parse(event));

    // console.log("Recieved data: ", JSON.parse(event)); // message and groups will be handled
    // console.log(result.data);
    wss1.clients.forEach(function (client) {
      // all the connected clients traversed
      client.send(JSON.stringify(result.data));
    });
  });
});

server.on("upgrade", (req, socket, head) => {
  const pathname = new URL(req.url, "wss://localhost:3000/");

  // if(pathname === '')
  wss1.handleUpgrade(req, socket, head, (ws) => {
    wss1.emit("connection", ws, req);
  });
});

main();

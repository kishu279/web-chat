require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const userRoutes = require("./Routes/userRoutes");

const app = express();
const server = http.createServer(app);
app.use(express.json());

// CORS APPLIED
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
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

main();

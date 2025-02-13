require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const userRoutes = require("./Routes/userRoutes");

const app = express();
const server = http.createServer(app);
app.use(express.json());

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

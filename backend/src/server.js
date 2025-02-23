require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { WebSocketServer } = require("ws");
const url = require("url");
const jwt = require("jsonwebtoken");

const userRoutes = require("./Routes/userRoutes");
const { mssgSchema } = require("./schema/userData");
const { error } = require("console");

const app = express();
const server = http.createServer(app);
app.use(express.json());
const wss1 = new WebSocketServer({ noServer: true });

// Grp Name and Token will be map
const userToken = new Map();
const grpUsers = new Map(); // the users will be in the array format

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

// Http request
app.use("/user", userRoutes);



// Web Socket request
wss1.on("connection", (ws) => {
  console.log("Connected to server !!!");

  // OnError event is also do the same as close
  ws.on("error", (error) => {
    // first remove from the grp
    const user = userToken[ws]; // [token, grpName]

    const grpName = user[1];
    if (grpUsers.has(grpName)) {
      const grpArray = grpUsers.get(grpName);

      const index = grpArray.indexOf(ws);
      if (index > -1) {
        grpArray.splice(index, 1);
      }

      if (grpArray.length === 0) {
        // if no users are there then remove the grp
        grpUsers.delete(grpName);
      } else {
        // if the users are there then update the Arrray
        grpUsers.set(grpName, grpArray);
      }
    }
    console.log(error);
  });

  ws.on("close", () => {
    // first remove from the grp
    const user = userToken[ws]; // [token, grpName]

    try {
      if (grpUsers.has(user[1])) {
        const grpArray = grpUsers.get(grpName);

        const index = grpArray.indexOf(ws);
        if (index > -1) {
          grpArray.splice(index, 1);
        }

        if (grpArray.length === 0) {
          // if no users are there then remove the grp
          grpUsers.delete(grpName);
        } else {
          // if the users are there then update the Arrray
          grpUsers.set(grpName, grpArray);
        }
      }

      console.log("Connecion is closed");
    } catch (err) {
      console.log(err);
    }
  });

  ws.on("message", (event) => {
    const result = mssgSchema.safeParse(JSON.parse(event));

    // console.log("Recieved data: ", JSON.parse(event)); // message and groups will be handled
    // console.log(result.data);

    // destructure the token and grp name

    if (result.success) {
      // console.log(typeof result.data);
      const { group } = result.data;
      // console.log(group);

      // But for the users in specific group
      const grpArray = grpUsers.get(group);

      grpArray.forEach((client) => {
        client.send(JSON.stringify(result.data));
      });
    } else {
      console.log(result.error.format());
    }

    // for Broadcasting to all the users
    // wss1.clients.forEach(function (client) {
    //   // all the connected clients traversed
    //   client.send(JSON.stringify(result.data));
    // });
  });
});

server.on("upgrade", async (req, socket, head) => {
  // console.log(req.url);

  // const { pathname } = new URL(req.url, "ws://localhost:3000/"); // If link would be ws://localhost:3000/path
  // const grpName = pathname;

  const queryParams = new URLSearchParams(url.parse(req.url).query); // url :- ws://localhost:3000/?token=...&grpName=...
  const grpName = queryParams.get("grpName");
  const token = queryParams.get("token");

  // passing the token to the function which will check auth
  const authenticated = await authentication(token);

  try {
    if (!authenticated) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n");
      socket.write("Content-Type: text/plain\r\n");
      socket.write("Connection: close\r\n");
      socket.write("\r\n");
      socket.write("Authentication failed please try sign in again\r\n");

      socket.destroy(); // socket is destroyed if it causes an error
      console.error("Authentication is failed");
      return;
    }

    wss1.handleUpgrade(req, socket, head, (ws) => {
      // console.log("UnderHandleUpgrade");
      // check for the existing grp ot the user is connected
      if (!userToken.has(ws)) {
        // if no users are there then ws object are mapped with the token
        console.log("User Connected");
        userToken.set(ws, [token, grpName]);
      }

      if (!grpUsers.has(grpName)) {
        // if no grp created then new array will be created
        console.log("New Grp Created");
        grpUsers.set(grpName, [ws]);
      } else {
        // grpUsers[grpName] = (prev) => [...prev, ws];  // wrong way of implementation
        console.log("Appending with the prev grp");
        grpUsers.set(grpName, [...grpUsers.get(grpName), ws]); // Good way of implementation
      }

      wss1.emit("connection", ws, req);
    });
  } catch (err) {
    socket.destroy();
    console.error("err: ", err);
  }
});

// server.on("upgrade", (req, socket, head) => {
//   // console.log(req.url);

//   // const { pathname } = new URL(req.url, "ws://localhost:3000/"); // If link would be ws://localhost:3000/path
//   // const grpName = pathname;

//   const queryParams = new URLSearchParams(url.parse(req.url).query); // url :- ws://localhost:3000/?token=...&grpName=...
//   const grpName = queryParams.get("grpName");
//   const token = queryParams.get("token");

//   wss1.handleUpgrade(req, socket, head, (ws) => {
//     // console.log("UnderHandleUpgrade");
//     // check for the existing grp ot the user is connected
//     if (!userToken.has(ws)) {
//       // if no users are there then ws object are mapped with the token
//       console.log("User Connected");
//       userToken.set(ws, [token, grpName]);
//     }

//     if (!grpUsers.has(grpName)) {
//       // if no grp created then new array will be created
//       console.log("New Grp Created");
//       grpUsers.set(grpName, [ws]);
//     } else {
//       // grpUsers[grpName] = (prev) => [...prev, ws];  // wrong way of implementation
//       console.log("Appending with the prev grp");
//       grpUsers.set(grpName, [...grpUsers.get(grpName), ws]); // Good way of implementation
//     }

//     wss1.emit("connection", ws, req);
//   });
// });

async function authentication(token) {
  return await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("JWT verification error: ", err);
      return false;
    }

    if (decoded) {
      console.log("JWT decoded: ", decoded);
      return true;
    }
  });
}

main();

const { WebSocketServer } = require("ws");
const WebSocket = require("ws");

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("connection established !!!");

  ws.on("error", console.error);

  ws.on("message", (data) => {
    console.log(data.toString());
    // data will be an object
    // ZOD
    // PRISMA
    if (data.data !== null) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          // client.emit("DataFromAnotherUser", { data: data.data });

          client.send(`${data}`);
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });
});

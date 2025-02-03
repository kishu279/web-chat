const { WebSocketServer } = require("ws");
const WebSocket = require("ws");

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("connection established !!!");
  
  ws.on("error", console.error);

  ws.on("message", (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Data: ${data}`);
      }
    });
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });
});

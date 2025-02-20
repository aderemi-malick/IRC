import express from "express";
import cors from "cors";
//import records from "./routes/record.js"
import users from "./routes/users.js";
import rooms from "./routes/rooms.js"
const socketIo = require("socket.io");
const initSocket = require('./routes/socket.js');

const app = express();
const http = require('http');
const server = http.createServer(app); // Le serveur HTTP que Socket.IO va utiliser
const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5500", // Frontend (si sur un autre port/domaine)
    methods: ["GET", "POST"]
  }
});


const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());
//app.use("/", records);
app.use("/users", users);
app.use("/rooms", rooms);
initSocket(io);

/* app.get("/", (req, res) => {
res.sendFile("D:/Epitech/T5/JSF-600/T-JSF-600-PAR_13/index.html")
});  */

/*//test 
//SOCKET IO Messages
io.on("connection", function(socket) {
  // Chat message event listening
  socket.on("chat message", function(msg) {
      // Chat message event broadcasting
      io.emit("chat message", msg);
  });

  // Chat message event listening
  socket.on("/nick", function(msg) {
    // Chat message event broadcasting
    io.emit("chat message", msg);
});

  // Chat message event listening
  socket.on("/list", function(msg) {
    // Chat message event broadcasting
    io.emit("chat message", msg);
});

  // Chat message event listening
  socket.on("/create", function(msg) {
    // Chat message event broadcasting
    io.emit("chat message", msg);
});

});*/


// start the Express server
/* app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); */

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
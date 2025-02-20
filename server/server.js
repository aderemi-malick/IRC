import express from "express";
import cors from "cors";
import { Server } from "socket.io"; // ✅ Importation correcte
import { createServer } from "http"; // ✅ Importation du serveur HTTP

import users from "./routes/users.js";
import rooms from "./routes/rooms.js";
import { initSocket } from "./routes/socket.js"; 


const app = express();
const server = createServer(app); // ✅ Création du serveur HTTP

const io = new Server(server, { // ✅ Correction ici
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/rooms", rooms);

initSocket(io); // ✅ Initialisation des sockets

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

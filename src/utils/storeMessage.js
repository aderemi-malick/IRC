import { io } from "socket.io-client";

const socket = io("http://localhost:8080"); // Adresse du serveur Socket.io

export const storeMessage = async (room, newMessage) => {
  try {
    const roomTag = room.replace("#", ""); // Supprime le # du nom de la room
    const url = `http://localhost:8080/rooms/${roomTag}/messages`; // URL de l'API

    // 1. Envoyer le message au serveur via Socket.io
    socket.emit("sendMessage", { room: roomTag, ...newMessage });

    // 2. Enregistrer le message dans la base de données via une requête API
    const response = await fetch(url, {
      method: "POST", // Utilisation de POST pour stocker un nouveau message
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'enregistrement du message");
    }

    const data = await response.json();
    console.log("Message enregistré avec succès:", data);
    return data;
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

// Écouter les nouveaux messages reçus via Socket.io
socket.on("receiveMessage", (message) => {
  console.log("Nouveau message reçu :", message);
});

// Exemple d'utilisation
// storeMessage("#general", "Salut tout le monde !", "Alice");

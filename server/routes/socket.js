import * as db from "../db/connection.js";
// const db = require("../db/connection.js")

export function initSocket(io) {
    io.on('connection', (socket) => {
      console.log('Un utilisateur est connecté');
  
      // Lorsque l'utilisateur envoie un message de chat
      /* socket.on('message', async (msg) => { //socket.on('message', async (msg, roomName)
        try {
          const roomsCollection = db.collection('rooms');
          const room = await roomsCollection.findOne({ roomname: roomName });
  
          if (room) {
            // Ajouter le message à la room
            const newMessage = { id: new Date().toISOString(), sendby: 'user1', content: msg };
            room.messages.push(newMessage);//io.emit('message', newMessage);
            await roomsCollection.updateOne({ roomname: roomName }, { $set: { messages: room.messages } });
  
            // Diffuser le message à tous les clients dans cette room
            io.emit('message', msg); 
          }
        } catch (err) {
          console.error('Erreur lors de l\'ajout du message:', err);
        }
      }); */

      // 
      const salons = ["#general", "message"];

      for (const salon of salons) {
        socket.on(salon, async (msg) => {  // Écoute sur chaque salon
          try {
            io.emit(salon, msg);  // Envoi du message à tous les clients dans le salon
          } catch (err) {
            console.error('Erreur lors de l\'ajout du message:', err);
          }
        });
      }
      /* socket.on('#general', async (msg) => { //socket.on('message', async (msg, roomName)
        try {
            io.emit('#general', msg); 
        } catch (err) {
          console.error('Erreur lors de l\'ajout du message:', err);
        }
      }); */
  
      // Déconnexion d'un utilisateur
      socket.on('disconnect', () => {
        console.log('Un utilisateur a quitté');
      });
    });
  };

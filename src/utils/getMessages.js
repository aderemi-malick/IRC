  export const getMessages = async (room) => {
    try {
      const roomTag = room.replace("#","")
      //console.log(roomTag)
      const response = await fetch(`http://localhost:8080/rooms/${roomTag}`); // URL de l'API à changer
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des messages");
      }
      const data = await response.json();
      console.log(data.messages)
      // On retourne les messages sous forme d'un tableau d'objets
      return data.messages;
      // .map((msg) => ({
      //   idContact: msg.id,
      //   nameContact: msg.name,
      //   messageContact: msg.message,}));
    } catch (error) {
      console.error("Erreur:", error);
      return [];
    }
  };
  
  //getMessages("#admin")
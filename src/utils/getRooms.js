export const getRooms = async () => {
  try {
    const response = await fetch("http://localhost:8080/rooms"); // URL de l'API à changer
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des messages");
    }
    const data = await response.json();
    console.log(data);
    // On retourne les messages sous forme d'un tableau d'objets
    return data;
    // .map(() => ({
    //   idRoom: msg.id,
    //   nameRoom: msg.name
    // }));
  } catch (error) {
    console.error("Erreur:", error);
    return [];
  }
  
};


getRooms();
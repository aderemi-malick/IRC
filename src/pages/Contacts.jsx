import React, { useState, useEffect } from "react";
import { getRooms } from "../utils/getRooms";
import { useNavigate } from "react-router-dom"; // 🔹 Importer useNavigate

export const Contacts = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate(); // 🔹 Hook de navigation

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsData = await getRooms();
      setRooms(roomsData);
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Liste des Rooms</h2>
      {rooms.length === 0 ? (
        <p>Chargement des rooms...</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room._id}>{room.roomname}</li>
          ))}
        </ul>
      )}

      {/* 🔹 Bouton pour revenir à la page d'accueil */}
      <button onClick={() => navigate("/")}>Retour à l'accueil</button>
    </div>
  );
};

export default Contacts;

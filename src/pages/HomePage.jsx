import React, { useState, useEffect } from "react";
import { FaRegPaperPlane, FaCheck, FaCheckDouble } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import "../assets/styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../utils/getRooms"; // Import de la fonction externe
import { getMessages } from "../utils/getMessages";

//variable contacts pour les données des contacts
const contacts = await getRooms();
//variable discussion pour les données des messages
let discussions;


const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //stockage du nom
    const storedName = localStorage.getItem("userName");
    if (selectedContact && storedName) {
      setUserName(storedName);
      fetchMessages(selectedContact.roomname);
    }else{
      navigate("/");
    }

    const fetchMessagesAndRooms = async () => {
      // Fetch les messages pour le contact sélectionné
      if (selectedContact) {
        const fetchedMessages = await getMessages(selectedContact.roomname);
        setMessages(fetchedMessages);
      }

      // Fetch les rooms
      const roomsData = await getRooms();
      setRooms(roomsData);
    };

    fetchMessagesAndRooms();
  }, [selectedContact], [navigate]);

  const fetchMessages = async (selectedContact) => {
    const fetchedMessages = await getMessages(selectedContact.roomname);
    setMessages(fetchedMessages);
  };

  const handleLogin = () => {
    navigate("/");
  };

  //select contact c'est la varible qui stock les contact mapé depuis la base de données
  const selectContact = (contacts) => {
    setSelectedContact(contacts);
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: discussions.length,
        content: newMessage,
        sender: userName
        // time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        // status: "sent",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      {/* === LISTE DES CONTACTS === */}
      <div className="contact-list">
        <div className="header">
          <IoIosCloseCircle size={30} color="#68A691" onClick={handleLogin} />
          {/* <label htmlFor="text" type="text" > */}
        </div>
        <h2>Discussions de {userName}</h2>
        {contacts.map((contacts) => (
          <div
            key={contacts.roomname}
            className={`contact-item ${selectedContact.id === contacts.id ? "active" : ""}`}
            onClick={async () => {
              discussions = await getMessages(selectedContact.roomname)
              selectContact(contacts)  
            }}
          >
            {/* <img src={contact.img} alt={contact.name} className="contact-img" /> */}
            <div>
              <h3 className="contact-name">{contacts.roomname}</h3>
            </div>
          </div>
          
        ))}
      </div>

      {/* === SECTION DES MESSAGES === */}
      <div className="chat-section">
        <div className="chat-header">
          <div className="contact-info">
            {/* <img src={selectedContact.img} alt={selectedContact.name} className="contact-header-img" /> */}
            {/* AFFFICHER LE NOM DU CONTACT SELECTIONNER */}
            <h2>{selectedContact.roomname}</h2>
          </div>
          <button className="info-btn">
            <FiInfo size={24} />
          </button>
        </div>

        {/* LISTE DES MESSAGES */}
        <div className="message-list">
          {messages.length === 0 ? (
            <p className="loading-text">Chargement des messages...</p>
          ) : (
            messages.map((discussions) => (
              <div key={discussions.id} className={`message ${discussions.sendby === userName? "message-me" : "message-contact"}`}>
                <p>{discussions.content}</p>
                <div className="message-time">
                  {/* <span>{discussions.time}</span>
                  {discussions.status === "sent" && <FaCheck size={12} />}
                  {discussions.status === "received" && <FaCheckDouble size={12} />}
                  {discussions.status === "seen" && <FaCheckDouble size={12} className="seen" />} */}
                </div>
              </div>
            ))
            // messages.map((msg) => (
            //   <div key={msg.id} className={`message ${msg.sender === "me" ? "message-me" : "message-contact"}`}>
            //     <p>{msg.text}</p>
            //     <div className="message-time">
            //       <span>{msg.time}</span>
            //       {msg.status === "sent" && <FaCheck size={12} />}
            //       {msg.status === "received" && <FaCheckDouble size={12} />}
            //       {msg.status === "seen" && <FaCheckDouble size={12} className="seen" />}
            //     </div>
            //   </div>
            // ))
          )}
        </div>

        {/* BARRE DE SAISIE */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Écrire un message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="send-btn">
            <FaRegPaperPlane size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};


export default HomePage;

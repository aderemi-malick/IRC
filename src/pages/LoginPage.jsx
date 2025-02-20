import React, { useState } from "react";
import "../assets/styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [nameUser, setNameUser] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (nameUser !== "") {
      localStorage.setItem("userName", nameUser); // Stocker le nom
      navigate("/homepage");
    }
  };

  const handleUst = (e) =>{
    e.preventDefault();
    navigate("/rooms")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameUser !== "") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="login-page">
      <div className="left">

      </div>
      <div className="right">
        <h3>Connectez-vous à votre compte</h3>
        <form onSubmit={handleSubmit}>
          <div className="div-name">
            <label htmlFor="name">Entrez votre nom :</label>
            <input
              value={nameUser}
              onChange={(e) => setNameUser(e.target.value)}
              id="name"
              type="text"
              required
            />
          </div>
          <div className="div-button">
            <button type="submit" onClick={handleLogin}>
              Connexion
            </button>
            <button type="submit" onClick={handleUst}>
              rooms
            </button>
          </div>
        </form>

        {showAlert && <div className="alert-green">Bienvenue! 🎉</div>}
      </div>
    </div>
  );
};

export default LoginPage;

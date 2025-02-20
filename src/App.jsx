import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import Contacts from './pages/Contacts';
import './App.css'

function App() {

  return (
   

    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/rooms" element = {<Contacts/>} />
      </Routes>
    </Router>
 
  )
}

export default App

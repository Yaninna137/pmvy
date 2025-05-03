// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Turnos from "./pages/Turnos.jsx";
import Panel from "./pages/Panel.jsx";
import RegistroUsuario from "./pages/RegistroUsuario.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/turnos" element={<Turnos />} />
      <Route path="/panel" element={<Panel/>}></Route>
      <Route path="/registrousuario" element={<RegistroUsuario />} />
    </Routes>
  );
}

export default App;

// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Turnos from "./pages/Turnos.jsx";
import Panel from "./pages/Panel.jsx";
import RegistroUsuario from "./pages/RegistroUsuario.jsx";
import Notificaciones from "./pages/Notificaciones.jsx";
import NavBar from "./pages/NavBar.jsx";
import CalendarioA from './pages/CalendarioA.jsx'
import TurnosA from "./pages/TurnosA.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/navbar" element={<NavBar/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/notificaciones" element={<Notificaciones/>}/>
      <Route path="/calendarioa" element={<CalendarioA/>}/>
      <Route path="/turnosa" element={<TurnosA/>}/>
      <Route path="/home" element={<Home />} />
      <Route path="/turnos" element={<Turnos />} />
      <Route path="/panel" element={<Panel/>}></Route>
      <Route path="/registrousuario" element={<RegistroUsuario />} />
    </Routes>
  );
}

export default App;

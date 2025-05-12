// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
// import Turnos from "./pages/Turnos.jsx";
import Panel from "./pages/Panel.jsx";
import RegistroUsuario from "./Admin/RegistroUsuario.jsx";
import Notificaciones from "./Emp/Notificaciones.jsx";
import CalendarioGoogle from"./pages/CalendarioGoogle";
import CrearEventosGoogle from"./pages/CrearEventosGoogle";
import ListaEventosGoogle from "./pages/ListaEventosGoogle.jsx";
// import TurnosA from "./pages/TurnosA.jsx";
import Beta from "./pages/Beta.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/calendariogoogle" element={<CalendarioGoogle />} />
      <Route path="/creareventosgoogle" element={<CrearEventosGoogle />} />
      <Route path="/listaeventosgoogle" element={<ListaEventosGoogle />} />
      <Route path="/" element={<Login/>} />
      <Route path="/beta" element={<Beta/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/notificaciones" element={<Notificaciones/>}/>
      {/* <Route path="/turnosa" element={<TurnosA/>}/> */}
      <Route path="/home" element={<Home />} />
      {/* <Route path="/turnos" element={<Turnos />} /> */}
      <Route path="/panel" element={<Panel/>}></Route>
      <Route path="/registrousuario" element={<RegistroUsuario />} />
      
    </Routes>
  );
}

export default App;

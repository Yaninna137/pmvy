// src/pages/Turnos.jsx
import React from 'react';
import NavBar from './NavBar';

const Turnos = () => {
  return (
    <div>
      <NavBar />
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: '80vh' }}
      >
        <h2 className="mb-3 text-danger">¡Estamos trabajando en esta sección!</h2>
        <p className="mb-4 text-muted">
          Muy pronto podrás gestionar tus <span className="text-danger fw-bold">Turnos</span> aquí.
        </p>


        {/* Gatito durmiendo */}
        <img
          src="https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
          alt="Gatito chibi durmiendo"
          style={{ width: '200px', marginBottom: '20px' }}
        />

        {/* Herramientas básicas */}
        <div className="d-flex justify-content-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2965/2965564.png"
            alt="Destornillador"
            style={{ width: '40px' }}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/2965/2965566.png"
            alt="Llave inglesa"
            style={{ width: '40px' }}
          />
        </div>
      </div>

      {/* Estilos adicionales */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Turnos;

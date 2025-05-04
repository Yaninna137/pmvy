import React from 'react';
import NavBar from './NavBar';

export const CalendarioA = () => {
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const diasDelMes = Array.from({ length: 31 }, (_, i) => i + 1); // Mayo tiene 31 días
  const primerDia = new Date(2025, 4, 1).getDay(); // 4 = mayo

  const celdasVacias = Array(primerDia).fill(null);
  const celdas = [...celdasVacias, ...diasDelMes];

  return (
    <div>
      <NavBar />
      <div className="container mt-4 text-center">
        <h2>Calendario</h2>
        <p className="text-danger">
          En la próxima actualización esta sección tendrá funcionalidad completa y conexión a la API.
        </p>

        <div className="calendar mt-4 mx-auto" style={{ maxWidth: '400px' }}>
          <div className="d-flex justify-content-between fw-bold border-bottom pb-2 mb-2">
            {diasSemana.map((dia, i) => (
              <div key={i} style={{ width: '14.2%' }}>
                {dia}
              </div>
            ))}
          </div>
          <div className="d-flex flex-wrap">
            {celdas.map((dia, i) => (
              <div
                key={i}
                style={{
                  width: '14.2%',
                  height: '40px',
                  border: '1px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: dia ? '#f8f9fa' : 'transparent'
                }}
              >
                {dia || ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioA;

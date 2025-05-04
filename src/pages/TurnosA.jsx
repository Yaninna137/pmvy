// src/pages/TurnosA.jsx
import React from 'react'
import NavBar from './NavBar'

const TurnosA = () => {
  const empleados = [] // ← Esto luego se llenará con una función que cargue empleados desde Supabase

  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  const fechaActual = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h2 className="text-center text-danger mb-2">Editor de Turnos</h2>
        <p className="text-center text-muted mb-4">Esta sección se encuentra en desarrollo.</p>

        <form>
          <fieldset disabled>
            {/* Tipo de asignación */}
            <div className="mb-3">
              <label className="form-label fw-bold">Tipo de asignación</label>
              <select className="form-select">
                <option selected>Un usuario</option>
                <option>Todos los usuarios</option>
                <option>Seleccionar usuarios</option>
              </select>
            </div>

            {/* Selector de usuario */}
            <div className="mb-3">
              <label className="form-label fw-bold">Seleccionar usuario</label>
              <select className="form-select">
                <option selected>Ninguno</option>
                {empleados.map(emp => (
                  <option key={emp.id}>{emp.nombre}</option>
                ))}
              </select>
            </div>

            {/* Aviso */}
            <div className="mb-3">
              <label className="form-label fw-bold">Aviso</label>
              <textarea
                className="form-control"
                placeholder="Escriba el contexto de tipo de trabajo a realizar"
                rows="3"
              ></textarea>
            </div>

            {/* Fecha */}
            <div className="mb-3">
              <label className="form-label fw-bold">Fecha de inicio</label>
              <input type="date" className="form-control" value={fechaActual} />
            </div>

            {/* Días de la semana */}
            <div className="mb-3">
              <label className="form-label fw-bold">Días asignados</label>
              <div className="d-flex gap-2 flex-wrap">
                {diasSemana.map((dia, index) => (
                  <div
                    key={dia}
                    className="text-white text-center px-3 py-2 rounded-circle"
                    style={{
                      backgroundColor: index === 0 ? '#b30000' : '#e0e0e0',
                      color: index === 0 ? '#000000' : '#666666',
                      cursor: 'not-allowed',
                      width: '45px',
                      height: '45px',
                      lineHeight: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {dia}
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default TurnosA

import React from 'react'
import NavBar from './NavBar'

export default function Notificaciones() {
  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h2 className="fw-bold">Notificaciones</h2>
        <p className="text-danger">Esta sección estará disponible en la próxima actualización.</p>
        <hr />

        <div className="bg-light text-muted p-4 rounded border border-secondary-subtle shadow-sm">
          <p className="mb-0 text-center">No se ha revisado ningún aviso aún.</p>
        </div>
      </div>
    </div>
  )
}

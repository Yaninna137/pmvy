import React from 'react'
import { useAuth} from '../context/AuthContext'
function Panel() {
  const { perfil, empresa, loading } = useAuth()

  if (loading) return <p>Cargando...</p>
  if (!perfil || !empresa) return <p>No se pudo cargar la información del usuario.</p>

  const saludo =
    perfil.rol === 'administrador'
      ? 'Buenas Tardes Administrador, ha llegado a su área de Trabajo, que tenga una buen día de trabajo.'
      : 'Buenaaaas colega, ya puede revisar sus trabajos, y muchas buenas vibras.'

  const fechaActual = new Date().toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{saludo}</h2>
      <hr />
      <p><strong>Nombre:</strong> {perfil.nombre}</p>
      <p><strong>Rol:</strong> {perfil.rol}</p>
      <p><strong>Empresa:</strong> {empresa.nombre}</p>
      <p><strong>Fecha de hoy:</strong> {fechaActual}</p>
    </div>
  )
}

export default Panel

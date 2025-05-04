import React from 'react'
import { useAuth } from '../context/AuthContext'
import NavBar from "./NavBar";

function Panel() {
  const { perfil, empresa, loading } = useAuth()

  if (loading) return <p>Cargando...</p>
  if (!perfil || !empresa) return <p>No se pudo cargar la información del usuario.</p>

  const saludo =
    perfil.rol === 'admin'
      ? `Bienvenido, Administrador. Aquí puedes gestionar todas las configuraciones y el control de la empresa.`
      : `Bienvenido, ${perfil.nombre}. Aquí puedes consultar tus turnos y gestionar tu trabajo.`

  const fechaActual = new Date().toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div>
      <NavBar/>
      <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          
          <div className="container py-5">
            {/* Título principal */}
            <div className="text-center">
              <h1 className="display-4" style={{ color: '#b30000' }}>Welcome, {perfil.nombre}!</h1>
              <p className="lead" style={{ color: '#6c757d' }}>{saludo}</p>
              <hr />
            </div>

            {/* Contenedor de información */}
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="card shadow-lg p-5" style={{ borderRadius: '15px' }}>
                  <h3 className="card-title text-center mb-4">Detalles de Usuario</h3>
                  <p><strong>Nombre:</strong> {perfil.nombre}</p>
                  <p><strong>Rol:</strong> {perfil.rol}</p>
                  <p><strong>Empresa:</strong> {empresa.nombre}</p>
                  <p><strong>Fecha de hoy:</strong> {fechaActual}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Panel

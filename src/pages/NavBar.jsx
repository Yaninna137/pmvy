import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabaseClient'

export default function NavBar() {
  const { perfil, empresa, loading } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
    window.location.reload()
  }

  if (loading) return null

  return (
    <div className="w-100" style={{ background: 'linear-gradient(to right, #4b0000, #000000)' }}>
      <div className="d-flex justify-content-between align-items-center px-4 py-2">
        <span className="fw-bold" style={{ color: '#b30000' }}>
          Empresa {empresa?.nombre}
        </span>
        <button className="btn btn-sm btn-light d-lg-none" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <div className="d-none d-lg-flex gap-3 align-items-center">
          <Link className="text-white text-decoration-none" to="/panel">Home</Link>

          {perfil?.rol === 'admin' && (
            <>
              <Link className="text-white text-decoration-none" to="/registrousuario">Registro Usuario</Link>
              <Link className="text-white text-decoration-none" to="/calendario">Calendario</Link>
              <Link className="text-white text-decoration-none" to="/turnosa">Editor de Turnos</Link> {/* ← nuevo link */}
            </>
          )}

          {perfil?.rol === 'empleado' && (
            <>
              <Link className="text-white text-decoration-none" to="/turnos">Turnos</Link>
              <Link className="text-white text-decoration-none" to="/calendario">Calendario</Link>
              <Link className="text-white text-decoration-none" to="/notificaciones">Notificaciones</Link> {/* ← NUEVO */}
            </>
          )}

          <span className="text-white">{perfil?.nombre} ({perfil?.rol})</span>
          <button
            className="btn btn-sm"
            style={{ backgroundColor: '#dc3545', color: 'white' }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Menú desplegable en móviles */}
      {open && (
        <div className="d-flex flex-column align-items-start px-4 pb-3 gap-2 d-lg-none">
          <Link className="text-white text-decoration-none" to="/panel" onClick={() => setOpen(false)}>Home</Link>

          {perfil?.rol === 'admin' && (
            <>
              <Link className="text-white text-decoration-none" to="/turnosa" onClick={() => setOpen(false)}>Editor de Turnos</Link> {/* ← nuevo link */}
              <Link className="text-white text-decoration-none" to="/registrousuario" onClick={() => setOpen(false)}>Registro Usuario</Link>
              <Link className="text-white text-decoration-none" to="/calendarioa" onClick={() => setOpen(false)}>Calendario</Link>

            </>
          )}

          {perfil?.rol === 'empleado' && (
            <>
              <Link className="text-white text-decoration-none" to="/turnos" onClick={() => setOpen(false)}>Turnos</Link>
              <Link className="text-white text-decoration-none" to="/calendarioa" onClick={() => setOpen(false)}>Calendario</Link>
              <Link className="text-white text-decoration-none" to="/notificaciones" onClick={() => setOpen(false)}>Notificaciones</Link> {/* ← NUEVO */}
            </>
          )}

          <span className="text-white">{perfil?.nombre} ({perfil?.rol})</span>
          <button
            className="btn btn-sm"
            style={{ backgroundColor: '#dc3545', color: 'white' }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

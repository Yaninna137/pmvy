import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabaseClient'

export default function NavBar() {
  const { perfil, empresa, user, loading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login') // redirige al login
    window.location.reload() // refresca para limpiar datos contextuales
  }

  if (loading) return null // espera que cargue el perfil

  return (
    <nav>
      <h2>{empresa?.nombre}</h2>

      <ul>
        <li><Link to="/home">Home</Link></li>

        {perfil?.rol === 'admin' && (
          <>
            <li><Link to="/registrousuario">Registro Usuario</Link></li>
          </>
        )}

        {perfil?.rol === 'empleado' && (
          <>
            <li><Link to="/turnos">Turnos</Link></li>
          </>
        )}
      </ul>

      <div>
        <span>{perfil?.nombre} ({perfil?.rol})</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  )
}

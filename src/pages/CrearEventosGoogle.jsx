import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useGoogle } from '../context/GoogleContext'
import NavBar from './NavBar'

function CrearEventosGoogle() {
  const { usuariosEmpresa } = useAuth()
  const { insertarNotificacion } = useAuth();
  const { googleToken, initializeGoogle } = useGoogle()
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [fecha, setFecha] = useState('')
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFin, setHoraFin] = useState('')
  const [zonaHoraria, setZonaHoraria] = useState('America/Santiago')
  const [invitados, setInvitados] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('')

  const handleCrearEvento = async () => {
    if (!googleToken) {
      alert('No estás conectado con Google. Inicia sesión primero.')
      initializeGoogle()
      return
    }
    const token = googleToken

    const evento = {
      summary: titulo,
      description: descripcion,
      location: ubicacion,
      start: {
        dateTime: `${fecha}T${horaInicio}:00`,
        timeZone: zonaHoraria,
      },
      end: {
        dateTime: `${fecha}T${horaFin}:00`,
        timeZone: zonaHoraria,
      },
      attendees: invitados.map(email => ({ email })),
    }

    try {
      console.log('Evento a enviar:', evento)
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evento),
      })

      if (response.ok) {
        alert('Evento creado exitosamente 🎉')
        setTitulo('')
        setDescripcion('')
        setUbicacion('')
        setFecha('')
        setHoraInicio('')
        setHoraFin('')
        setInvitados([])
      } else {
        const errorData = await response.json()
        console.error('Error al crear el evento:', errorData)
        alert('Error al crear el evento. Mira la consola para más detalles.')
      }
    } catch (error) {
      console.error('Error de red:', error)
      alert('Error de red al intentar crear el evento.')
    }
  }

  // Función para agregar un usuario a la lista de invitados
  const agregarInvitado = () => {
    if (usuarioSeleccionado && !invitados.includes(usuarioSeleccionado)) {
      setInvitados([...invitados, usuarioSeleccionado])
      setUsuarioSeleccionado('') // Limpiar la selección
    }
  }

  // Función para eliminar un invitado
  const eliminarInvitado = (email) => {
    setInvitados(invitados.filter((invitado) => invitado !== email))
  }

  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Crear Evento en Google Calendar</h2>

        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ubicación:</label>
          <input
            type="text"
            className="form-control"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora de inicio:</label>
          <input
            type="time"
            className="form-control"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora de fin:</label>
          <input
            type="time"
            className="form-control"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Zona horaria:</label>
          <select
            className="form-select"
            value={zonaHoraria}
            onChange={(e) => setZonaHoraria(e.target.value)}
          >
            <option value="America/Santiago">America/Santiago</option>
            <option value="UTC">UTC</option>
            <option value="America/Buenos_Aires">America/Buenos_Aires</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Seleccionar usuario para invitar:</label>
          <select
            className="form-select"
            value={usuarioSeleccionado}
            onChange={(e) => setUsuarioSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un usuario</option>
            {usuariosEmpresa.map((user) => (
              <option key={user.id_usuario} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
          <button
            className="btn btn-secondary mt-2"
            onClick={agregarInvitado}
            disabled={!usuarioSeleccionado}
          >
            Agregar invitado
          </button>
        </div>

        <div className="mb-3">
          <h5>Invitados seleccionados:</h5>
          <ul>
            {invitados.map((email) => (
              <li key={email}>
                {email}
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => eliminarInvitado(email)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={handleCrearEvento}
            className="btn btn-primary"
          >
            Crear Evento
          </button>
        </div>
      </div>
    </div>
  )
}

export default CrearEventosGoogle

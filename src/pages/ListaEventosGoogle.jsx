import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import NavBar from './NavBar';

const CLIENT_ID = '1007029164830-ssanorn533i50fkcpmekoha6igbmsj4q.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAVD67rpIDCdxYNJ5xoLpvcsiSVN9DwZMY';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const timeOptions = [
  { label: 'Hoy', value: 'today' },
  { label: 'Mañana', value: 'tomorrow' },
  // { label: 'Esta semana', value: 'week' },
  { label: 'Este mes', value: 'month' },
  { label: 'En 1 año', value: 'year1' },
];

const ListaEventosGoogle = () => {
  const [eventos, setEventos] = useState([]);
  const [filtro, setFiltro] = useState('today');
  const [cargando, setCargando] = useState(false);

  const calcularRango = (filtro) => {
    const ahora = new Date();
    let start = new Date(ahora);
    let end = new Date(ahora);

    switch (filtro) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'tomorrow':
        start.setDate(start.getDate() + 1);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setHours(23, 59, 59, 999);
        break;
      case 'week': {
        const today = new Date();
        const day = today.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado

        // Calcular lunes de esta semana
        const monday = new Date(today);
        monday.setDate(today.getDate() - ((day + 6) % 7)); // Ajuste para que lunes sea día 1
        monday.setHours(0, 0, 0, 0);

        // Calcular domingo
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);

        start = monday;
        end = sunday;
        
        break;
      }
      case 'month':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setMonth(start.getMonth() + 1);
        end.setDate(0); // último día del mes anterior al nuevo
        end.setHours(23, 59, 59, 999);
        break;
      case 'year1':
        start.setHours(0, 0, 0, 0);
        end.setFullYear(start.getFullYear() + 1);
        end.setHours(23, 59, 59, 999);
        break;
    }

    return {
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
    };
  };


  const listarEventos = () => {
    setCargando(true);
    const { timeMin, timeMax } = calcularRango(filtro);

    gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin,
      timeMax,
      showDeleted: false,
      singleEvents: true,
      maxResults: 100,
      orderBy: 'startTime',
    }).then((response) => {
      setEventos(response.result.items);
      setCargando(false);
    }).catch((error) => {
      console.error('Error al obtener eventos:', error);
      setCargando(false);
    });
  };

  // Inicializar gapi
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOC],
        scope: SCOPES,
      }).then(() => {
        return gapi.auth2.getAuthInstance().signIn();
      }).then(() => {
        listarEventos();
      }).catch((error) => {
        console.error('Error al iniciar cliente de Google:', error);
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  // Cuando cambia el filtro, actualiza automáticamente
  useEffect(() => {
    listarEventos();
  }, [filtro]);

  // Formatear fecha
  const formatearFecha = (fechaIso) => {
    if (!fechaIso) return 'Fecha desconocida';
    const fecha = new Date(fechaIso);
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(fecha);
  };

  // Formatear hora (si tiene)
  const formatearHora = (fechaIso) => {
    if (!fechaIso) return null;
    const fecha = new Date(fechaIso);
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Lista de Eventos de Google Calendar</h2>

        <label className="block mb-2">Filtrar por rango de tiempo:</label>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="mb-4 border rounded p-2"
        >
          {timeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {cargando ? (
          <p>Cargando eventos...</p>
        ) : eventos.length === 0 ? (
          <p>No hay eventos para este rango.</p>
        ) : (
          <ul className="space-y-4">
            {eventos.map((evento) => {
              const fechaFormateada = formatearFecha(evento.start.dateTime || evento.start.date);
              const hora = formatearHora(evento.start.dateTime);
              return (
                <li key={evento.id} className="p-4 border rounded-lg shadow bg-white">
                  <p className="font-semibold text-lg">{fechaFormateada}</p>
                  <p className="text-gray-800">
                    <strong>Evento:</strong> {evento.summary || '(Sin título)'}
                  </p>
                  {hora && (
                    <p className="text-gray-600">
                      <strong>Hora:</strong> {hora}
                    </p>
                  )}
                  {evento.description && (
                    <p className="text-gray-700">
                      <strong>Asunto:</strong> {evento.description}
                    </p>
                  )}
                  {evento.location && (
                    <p className="text-gray-500">
                      <strong>Ubicación:</strong> {evento.location}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default ListaEventosGoogle;

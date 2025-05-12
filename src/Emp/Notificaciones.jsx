import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import NavBar from '../pages/NavBar';
function Notificaciones() {
  const { user } = useAuth(); // Obtén el usuario autenticado
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    // Consulta las notificaciones del empleado autenticado
    const fetchNotificaciones = async () => {
      const { data, error } = await supabase
        .from('notificaciones')
        .select('*')
        .eq('id_empleado', user?.id_empleado) // Filtra por el ID del empleado
        .order('creado_en', { ascending: false }); // Ordenar por fecha de creación (más recientes primero)

      if (error) {
        console.error('Error al obtener notificaciones:', error);
      } else {
        setNotificaciones(data);
      }
    };

    if (user?.id_empleado) {
      fetchNotificaciones();
    }
  }, [user]);

  const marcarComoVisto = async (id) => {
    const { error } = await supabase
      .from('notificaciones')
      .update({ visto: true })
      .eq('id', id);

    if (error) {
      console.error('Error al marcar la notificación como vista:', error);
    } else {
      setNotificaciones(notificaciones.map(n => (n.id === id ? { ...n, visto: true } : n)));
    }
  };

  return (
    <div>
      <NavBar/>
    <div className="container">
      <h2 className="text-center mb-4">Notificaciones</h2>
      {notificaciones.length === 0 ? (
        <p>No tienes notificaciones.</p>
      ) : (
        <ul>
          {notificaciones.map((notificacion) => (
            <li key={notificacion.id} className={`list-group-item ${notificacion.visto ? 'list-group-item-success' : ''}`}>
              <strong>{notificacion.titulo}</strong>
              <p>{notificacion.mensaje}</p>
              {!notificacion.visto && (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => marcarComoVisto(notificacion.id)}
                >
                  Marcar como visto
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default Notificaciones;

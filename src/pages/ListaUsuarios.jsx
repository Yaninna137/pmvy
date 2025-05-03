import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function ListaUsuarios() {
  const { empresa } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, [empresa]);

  const cargarUsuarios = async () => {
    if (!empresa?.id_empresa) return;

    const { data: empleados, error: errorEmp } = await supabase
      .from('user_empleado')
      .select('*')
      .eq('id_empresa', empresa.id_empresa);

    const { data: admins, error: errorAdmin } = await supabase
      .from('user_administrado')
      .select('*')
      .eq('id_empresa', empresa.id_empresa);

    if (errorEmp || errorAdmin) {
      console.error('Error cargando usuarios:', errorEmp || errorAdmin);
      return;
    }

    const empleadosConRol = (empleados || []).map(emp => ({ ...emp, tipo: 'empleado' }));
    const adminsConRol = (admins || []).map(admin => ({ ...admin, tipo: 'admin' }));

    setUsuarios([...empleadosConRol, ...adminsConRol]);
  };

  const handleEliminar = async (usuario) => {
    const confirmar = window.confirm(`¿Seguro que deseas eliminar a ${usuario.nombre}?`);

    if (!confirmar) return;

    if (usuario.tipo === 'admin') {
      alert('No puedes eliminar a un administrador.');
      return;
    }

    try {
      // 1. Eliminar de la tabla user_empleado
      const { error: deleteError } = await supabase
        .from('user_empleado')
        .delete()
        .eq('id_empleado', usuario.id_empleado);

      if (deleteError) throw deleteError;
      console.log('✔️ Empleado eliminado de la tabla user_empleado');

      // 2. Eliminar del Auth con función Edge
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { user_id: usuario.id_empleado },
      });

      if (error) {
        console.error('❌ Error en delete-user:', error);
        throw error;
      }

      console.log('✔️ Usuario eliminado de Auth:', data);

      alert('Usuario eliminado correctamente.');
      cargarUsuarios();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setMensajeError('Hubo un problema al eliminar el usuario. Intenta de nuevo más tarde.');
    }
  };

  const handleEditar = (usuario) => {
    setEditando(usuario);
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>

      {mensajeError && <div style={{ color: 'red' }}>{mensajeError}</div>}

      {editando && (
        <div style={{ marginBottom: '1rem' }}>
          <h3>Editando a: {editando.nombre}</h3>
          <p>Email: {editando.email}</p>
          <p>Contraseña: (no editable)</p>
          <button onClick={() => setEditando(null)}>Cancelar</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id_empleado || u.id_administrador}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.tipo}</td>
              <td>
                <button onClick={() => handleEditar(u)}>Editar</button>
                {u.tipo !== 'admin' && (
                  <button onClick={() => handleEliminar(u)}>Eliminar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

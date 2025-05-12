import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'

export default function ListaUsuarios() {
  const { empresa, getSessionToken } = useAuth()
  const [usuarios, setUsuarios] = useState([])
  const [mensajeError, setMensajeError] = useState(null)
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const [form, setForm] = useState({ nombre: '' })

  useEffect(() => {
    cargarUsuarios()
  }, [empresa])

  const cargarUsuarios = async () => {
    if (!empresa?.id_empresa) return

    const { data: empleados } = await supabase
      .from('user_empleado')
      .select('*')
      .eq('id_empresa', empresa.id_empresa)

    const { data: admins } = await supabase
      .from('user_administrado')
      .select('*')
      .eq('id_empresa', empresa.id_empresa)

    const empleadosConRol = (empleados || []).map(e => ({ ...e, tipo: 'empleado' }))
    const adminsConRol = (admins || []).map(a => ({ ...a, tipo: 'admin' }))
    setUsuarios([...empleadosConRol, ...adminsConRol])
    setUsuarioEditando(null)
  }

  const handleEliminar = async (usuario) => {
    const confirmar = window.confirm(`¿Eliminar a ${usuario.nombre}?`)
    if (!confirmar || usuario.tipo === 'admin') return

    try {
      await supabase.from('user_empleado').delete().eq('id_empleado', usuario.id_empleado)
      const token = getSessionToken()
      await supabase.functions.invoke('delete-user', {
        method: 'POST',
        body: JSON.stringify({ user_id: usuario.id_empleado }),
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('Usuario eliminado correctamente')
      cargarUsuarios()
    } catch (error) {
      setMensajeError('No se pudo eliminar el usuario. Intenta más tarde.')
    }
  }

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario)
    setForm({ nombre: usuario.nombre })
  }

  const handleGuardar = async () => {
    if (!usuarioEditando) return

    try {
      if (usuarioEditando.tipo === 'empleado') {
        await supabase
          .from('user_empleado')
          .update({ nombre: form.nombre })
          .eq('id_empleado', usuarioEditando.id_empleado)
      } else {
        await supabase
          .from('user_administrado')
          .update({ nombre: form.nombre })
          .eq('id_administrador', usuarioEditando.id_administrador)
      }

      alert('Cambios guardados correctamente')
      cargarUsuarios()
    } catch (error) {
      setMensajeError('No se pudieron guardar los cambios.')
    }
  }

  return (
    <div className="card shadow p-4">
      <h4 className="mb-3 text-danger">Lista de usuarios</h4>

      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

      {/* Formulario de edición */}
      {usuarioEditando && (
        <div className="mb-4 border p-3 rounded bg-light">
          <h5 className="mb-3 text-primary">Editar Usuario</h5>
          <div className="mb-2">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Correo</label>
            <input
              className="form-control"
              value={usuarioEditando.email}
              disabled
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Rol</label>
            <input
              className="form-control"
              value={usuarioEditando.tipo}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña (UUID)</label>
            <input
              className="form-control"
              value={
                usuarioEditando.id_empleado ||
                usuarioEditando.id_administrador
              }
              disabled
            />
          </div>
          <button className="btn btn-success me-2" onClick={handleGuardar}>
            Guardar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setUsuarioEditando(null)}
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
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
                <button
                  style={{ backgroundColor: '#000000', color: '#ffffff' }}
                  className="btn btn-sm me-2"
                  onClick={() => handleEditar(u)}
                >
                  Editar
                </button>
                  {u.tipo !== 'admin' && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleEliminar(u)}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

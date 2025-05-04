import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import NavBar from './Navbar'
import ListaUsuarios from './ListaUsuarios'

export default function RegistroUsuario() {
  const { empresa, perfil } = useAuth()
  const [form, setForm] = useState({
    email: '',
    password: '',
    nombre: '',
    rol: 'empleado',
  })

  const handleRegistro = async (e) => {
    e.preventDefault()

    if (!empresa?.id_empresa) return

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password.trim(),
    })

    if (authError) {
      alert('Error al registrar usuario: ' + authError.message)
      return
    }

    const id_empleado = authData?.user?.id

    const { error: insertError } = await supabase.from('user_empleado').insert([
      {
        id_empleado,
        nombre: form.nombre.trim(),
        rol: form.rol,
        email: form.email.trim(),
        id_administrador: perfil.id_administrador,
        id_empresa: empresa.id_empresa,
      },
    ])

    if (insertError) {
      alert('Error al guardar en base de datos: ' + insertError.message)
    } else {
      alert('✅ Usuario registrado con éxito')
      setForm({ email: '', password: '', nombre: '', rol: 'empleado' })
    }
  }

  return (
    <>
      <NavBar />
      <div className="container my-4">
        <div className="card shadow p-4 mb-4">
          <h3 className="mb-3 text-danger">Registrar nuevo usuario</h3>
          <form onSubmit={handleRegistro}>
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-control"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select
                className="form-select"
                value={form.rol}
                onChange={(e) => setForm({ ...form, rol: e.target.value })}
              >
                <option value="empleado">Empleado</option>
              </select>
            </div>

            <button type="submit" className="btn btn-dark">Registrar</button>
          </form>
        </div>

        <ListaUsuarios />
      </div>
    </>
  )
}

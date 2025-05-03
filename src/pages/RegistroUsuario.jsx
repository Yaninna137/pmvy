// RegistroUsuario.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import NavBar from './Navbar'
import ListaUsuarios from './ListaUsuarios';
export default function RegistroUsuario() {
  const { empresa, perfil } = useAuth(); // Accede al contexto
  const [form, setForm] = useState({
    email: '',
    password: '',
    nombre: '',
    rol: 'empleado',
  });

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (!empresa?.id_empresa) {
      console.error('No se encontró id_empresa del admin');
      return;
    }

    // Crear el usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password.trim(),
    });

    if (authError) {
      console.error('Error al registrar en auth:', authError.message);
      return;
    }

    const id_empleado = authData?.user?.id;

    // Insertar datos en user_empleado
    const { error: insertError } = await supabase.from('user_empleado').insert([
      {
        id_empleado,
        nombre: form.nombre.trim(),
        rol: form.rol,
        email: form.email.trim(), // ← este campo FALTABA
        id_administrador: perfil.id_administrador, // ← Agregado aquí
        id_empresa: empresa.id_empresa,
      },
    ]);

    if (insertError) {
      console.error('Error al insertar en user_empleado:', insertError.message);
    } else {
      alert('Usuario registrado con éxito');
      setForm({ email: '', password: '', nombre: '', rol: 'empleado' });
    }
  };

  return (
    <div>
    <NavBar /> 
    <form onSubmit={handleRegistro}>
      <input
        type="text"
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Registrar Usuario</button>
    </form>
    <ListaUsuarios />
    </div>
  );
}

import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegistroFormulario({ onRegistroExitoso }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('user_empleado').insert([
      { nombre, correo }
    ]);

    if (error) {
      console.error('Error al registrar empleado:', error);
    } else {
      onRegistroExitoso(data[0]);
      setNombre('');
      setCorreo('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      <input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" />
      <button type="submit">Registrar</button>
    </form>
  );
}

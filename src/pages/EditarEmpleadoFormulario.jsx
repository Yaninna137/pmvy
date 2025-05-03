import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function EditarEmpleadoFormulario({ empleado, onActualizar, onCancelar }) {
  const [nombre, setNombre] = useState(empleado.nombre);
  const [correo, setCorreo] = useState(empleado.correo);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('user_empleado')
      .update({ nombre, correo })
      .eq('id', empleado.id)
      .select();

    if (error) {
      console.error('Error al actualizar empleado:', error);
    } else {
      onActualizar(data[0]);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input value={correo} onChange={(e) => setCorreo(e.target.value)} />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
}

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [empresa, setEmpresa] = useState(null)
  const [usuariosEmpresa, setUsuariosEmpresa] = useState([]) // NUEVO
  const [loading, setLoading] = useState(true)

  const signInWithSession = async () => {
    setLoading(true)
    const { data: session } = await supabase.auth.getSession()
    const currentUser = session?.session?.user

    if (currentUser) {
      setUser(currentUser)

      // Buscar si es administrador o empleado
      let { data: perfilAdmin } = await supabase
        .from('user_administrado')
        .select('*')
        .eq('id_administrador', currentUser.id)
        .single()

      let { data: perfilEmpleado } = await supabase
        .from('user_empleado')
        .select('*')
        .eq('id_empleado', currentUser.id)
        .single()

      const perfilFinal = perfilAdmin || perfilEmpleado
      setPerfil(perfilFinal)

      if (perfilFinal) {
        // Obtener datos de empresa
        const { data: empresaData } = await supabase
          .from('empresa')
          .select('*')
          .eq('id_empresa', perfilFinal.id_empresa)
          .single()

        setEmpresa(empresaData)

        // NUEVO: obtener empleados y admins de la misma empresa
        const { data: usuarios, error } = await supabase
          .from('empleados_y_admins_empresa')
          .select('*')
          .eq('id_empresa', perfilFinal.id_empresa)

        if (error) {
          console.error('Error cargando usuarios de la empresa:', error)
        } else {
          setUsuariosEmpresa(usuarios)
        }
      }
    } else {
      setUser(null)
      setPerfil(null)
      setEmpresa(null)
      setUsuariosEmpresa([]) // limpiar si no hay usuario
    }

    setLoading(false)
  }

  useEffect(() => {
    signInWithSession()
  }, [])

  const getSessionToken = () => {
    const { data: session } = supabase.auth.getSession()
    return session?.session?.access_token
  }
  const insertarNotificacion = async (titulo, mensaje) => {
  if (!user) return;  // Verificar si hay un usuario autenticado

  const { data: notificacion, error } = await supabase
    .from('notificaciones')
    .insert([
      {
        id_empleado: user.id,  // El id del usuario autenticado
        titulo: titulo,
        mensaje: mensaje,
      }
    ])

  if (error) {
    console.error('Error al insertar la notificación:', error)
  } else {
    console.log('Notificación insertada correctamente', notificacion)
  }
}
const obtenerNotificaciones = async () => {
  if (!user) return [];  // Verificar si hay un usuario autenticado

  const { data: notificaciones, error } = await supabase
    .from('notificaciones')
    .select('*')
    .eq('id_empleado', user.id)  // Asegurarse de que solo el usuario pueda ver sus notificaciones
    .order('creado_en', { ascending: false })

  if (error) {
    console.error('Error al obtener notificaciones:', error)
    return []
  }

  return notificaciones;
}


  return (
    <AuthContext.Provider
      value={{
        user,
        perfil,
        empresa,
        usuariosEmpresa, // NUEVO
        loading,
        signInWithSession,
        getSessionToken,
        insertarNotificacion,
        obtenerNotificaciones,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

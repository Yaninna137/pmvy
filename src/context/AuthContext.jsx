import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [empresa, setEmpresa] = useState(null)
  const [loading, setLoading] = useState(true)

  // Función reutilizable para cargar los datos del usuario
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

      // Determinar si es Admin o Empleado
      const perfilFinal = perfilAdmin || perfilEmpleado
      setPerfil(perfilFinal)

      if (perfilFinal) {
        // Obtener la empresa
        const { data: empresaData } = await supabase
          .from('empresa')
          .select('*')
          .eq('id_empresa', perfilFinal.id_empresa)
          .single()
        setEmpresa(empresaData)
      }
    } else {
      setUser(null)
      setPerfil(null)
      setEmpresa(null)
    }

    setLoading(false)
  }

  useEffect(() => {
    signInWithSession()
  }, [])

  return (
    <AuthContext.Provider value={{ user, perfil, empresa, loading, signInWithSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

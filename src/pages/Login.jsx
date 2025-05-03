import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false);
  const [step, setStep] = useState("start"); // Estado para controlar los pasos
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    rol: "admin",
    email: "",
    password: "",
  });
  const { signInWithSession } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = form;
    const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password: password.trim() 
    });

    if (error) {
      alert("Email o contraseña inválidos");
      console.log('Error al iniciar sesión:', error.message);
    } else {
      await signInWithSession(); // Esto actualiza el contexto automáticamente
      console.log('Sesión iniciada',data);
      navigate('/panel')
    }
  };

  const handleRegister = async () => {
    const { email, password } = form;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("No se pudo crear el usuario");
      return;
    }

    const id_admin = data.user.id;  // ID del usuario recién registrado

    setStep("verify"); // Pasamos al paso de verificación
  };

  const handleContinueAfterVerification = async () => {
    setStep("final"); // Pasamos al paso final después de la verificación
  };

  const handleFinaly = async () => {
    const { email, password, nombre, empresa, rol } = form;

    // Verificar el correo y password
    const { data: sessionData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      alert("Aún no has confirmado el correo. Revisa tu bandeja de entrada.");
      return;
    }

    const userID = sessionData.user.id; // Usar el userID de la sesión activa

    // Verificar si la empresa ya existe
    let { data: empresaData, error: errorEmpresa } = await supabase
      .from("empresa")
      .select("id_empresa")
      .eq("nombre", empresa)
      .single();

    if (errorEmpresa && errorEmpresa.code !== "PGRST116") {
      alert("Error al buscar empresa.");
      return;
    }

    let id_empresa = empresaData?.id_empresa;
    // Crear y agregar una empresa si no existe
    if (!id_empresa) {
      const { data: nuevaEmpresa, error: errorNueva } = await supabase
        .from("empresa")
        .insert({ nombre: empresa })
        .select()
        .single();

      if (errorNueva) {
        alert("No se pudo crear la empresa");
        return;
      }

      id_empresa = nuevaEmpresa.id_empresa;  // Guardar ID
    }

    // Crear y agregar el usuario en la tabla de administradores
    const { error: errorInsert } = await supabase
      .from("user_administrado")
      .insert([{
        id_administrador: userID, // Usar el userID de la sesión
        nombre,
        rol,
        email,
        id_empresa,
      }]); 

    if (errorInsert) {
      alert("No se pudo registrar en la tabla user_administrador.");
      return;
    }

    alert("Registro completo. Ya puedes iniciar sesión.");
    setIsRegister(false);
    setStep("start"); // Volver al inicio
  };

  return (
    <div>
        <h2>{isRegister ? "Registrarse" : "Iniciar Sesión"}</h2>

        {/* FORMULARIO DE REGISTRO */}
        {isRegister && step === "start" && (
        <>
            <input name="email" onChange={handleChange} placeholder="Email" />
            <input name="password" onChange={handleChange} placeholder="Contraseña" type="password" />
            <button onClick={handleRegister}>Registrarse</button>
        </>
        )}

        {/* VERIFICACIÓN POR CORREO */}
        {isRegister && step === "verify" && (
        <>
            <p>Hemos enviado un correo a <strong>{form.email}</strong>. Revisa tu bandeja y confirma el registro.</p>
            <button onClick={handleContinueAfterVerification}>Continuar</button>
        </>
        )}

        {/* COMPLETAR FORMULARIO DESPUÉS DE VERIFICAR */}
        {isRegister && step === "final" && (
        <>
            <input name="email" onChange={handleChange} placeholder="Email" />
            <input name="password" onChange={handleChange} placeholder="Contraseña" type="password" />
            <input name="nombre" onChange={handleChange} placeholder="Nombre" />
            <input name="empresa" onChange={handleChange} placeholder="Empresa" />
            <input name="rol" onChange={handleChange} value="admin" disabled />
            <p>Continue con el registro</p>
            <button onClick={handleFinaly}>Finalizar Registro</button>
        </>
        )}

        {/* LOGIN NORMAL */}
        {!isRegister && (
        <>
            <input name="email" onChange={handleChange} placeholder="Email" />
            <input name="password" onChange={handleChange} placeholder="Contraseña" type="password" />
            <button onClick={handleLogin}>Iniciar Sesión</button>
        </>
        )}

        <p>
        {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
        <button onClick={() => {
            setIsRegister(!isRegister);
            setStep("start");
        }}>
            {isRegister ? "Iniciar sesión" : "Registrarse"}
        </button>
        </p>

    </div>
  );
}

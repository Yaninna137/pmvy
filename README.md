# ShiftManager - Proyecto PMV (Avance)

**ShiftManager** es una aplicación web desarrollada como parte del proyecto PMV, orientada a la gestión de turnos laborales mediante roles diferenciados para empleados y administradores. Este avance representa un nuevo comienzo tras dificultades en una versión anterior del proyecto (PMN), priorizando ahora una base funcional estable, ordenada y real.

## 🚀 Tecnologías utilizadas

- Vite + React  
- Supabase (Auth, Database, RLS, Triggers)  
- Bootstrap (estilizado de la interfaz)  
- Backend (funciones protegidas como eliminación de usuarios)  
- React Router Dom  
- Context API (AuthContext para autenticación global)

## 📌 Avance actual

Durante esta etapa se lograron las siguientes funcionalidades:

- Creación de una nueva base de datos llamada `horario-laboral` con seguridad aplicada (RLS y triggers).
- Registro e inicio de sesión con Supabase Auth, sin verificación de correo.
- Asignación de roles (empleado o administrador) y navegación protegida.
- Implementación de formularios funcionales para agregar usuarios.
- Edición y eliminación controlada de usuarios empleados (administradores no se pueden eliminar).
- Confirmación antes de eliminar usuarios y sincronización con Supabase Auth y la base de datos.
- Recarga automática de la tabla tras modificaciones.
- Interfaz estilizada con Bootstrap.
- Backend conectado para validar acciones sensibles (borrado, etc.).
- Estructura limpia, modular y orientada al mantenimiento.
- Página subida y funcionando correctamente en Vercel.

🔗 **Link del sitio en Vercel**:  
👉 [https://pmvyyaninna1377.vercel.app](https://pmvyyaninna1377.vercel.app)

📽️ **Video demostrativo y visualización de base de datos**:  
👉 [Carpeta Drive con videos y documentación](https://drive.google.com/drive/folders/1c-OFo0TUtbZXkLkIq47-ZQAMmzSgzyuO?usp=sharing)

## 📂 Estructura actual

- `src/pages` → Páginas del sistema (Login, Registro, Panel, etc.)
- `src/components` → NavBar, formularios, y componentes reutilizables
- `src/context/AuthContext.jsx` → Lógica de autenticación y usuario global
- `src/backend` → Lógica de comunicación con Supabase

## 📌 Entrega final (por implementar)

- Funcionalidades completas para las páginas de **empleados** y **administradores**.
- Conexión con una **API externa** para gestión de calendarios y turnos.
- Mejoras en la experiencia de usuario y mensajes de validación más claros.
- Optimización final del código y documentación completa.

## 🧠 Notas

Este avance se centró en lograr un sistema funcional, estable y real, dejando atrás errores anteriores. A pesar de dificultades técnicas con versiones pasadas, este nuevo enfoque permitió construir una base sólida y mantenible, con apertura al aprendizaje continuo.

---


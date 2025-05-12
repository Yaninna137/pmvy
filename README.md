# ShiftManager - Proyecto PMV (Avance)

**ShiftManager** es una aplicación web desarrollada como parte del proyecto PMV, orientada a la gestión de turnos laborales mediante roles diferenciados para empleados y administradores. Este avance representa un nuevo comienzo tras dificultades en una versión anterior del proyecto (PMN), priorizando ahora una base funcional estable, ordenada y real.

## 🚀 Tecnologías utilizadas

- Vite + React  
- Supabase (Auth, Database, RLS, Triggers)  
- Bootstrap (estilizado de la interfaz)  
- Backend (funciones protegidas como eliminación de usuarios)  
- React Router Dom  
- Context API (AuthContext para autenticación global)
- Google Count + Google calenadario

## 📌 Avance actual

Durante esta etapa se lograron las siguientes funcionalidades:
- Tener Visualización de eventos(Turnos)
- Tener conexión con Api calendario
- Permitir crear y visualizar eventos
- Ordenar arhcivos(colocar las paginas en sus respectiva carpeta).
- Limpiar el proyecto (borrando paginas no funcionales).

## 📂 Estructura actual

Modificado:
- `src/pages` → Páginas del sistema formato global tanto empleado y admi(Login,Panel, etc.)
- `src/context/AuthContext.jsx` → Lógica de autenticación y usuario global + `GoogleContex.jsx` archivo para la autentificacion con google cloud.
Agregado:
- `src/Emp` Paginas de solos los empleados (Notificación)
- `src/Adm` Paginas de solo el admintrador (RegistroUsers)
Sin mofificar 
- `src/backend` → Lógica de comunicación con Supabase
Archivo modificado:
- `Login.jsx` Se tubo que agregar el GoogleContex.jsx, para poder trabajar sus datos.
- `main.jsx` Importamos el archivo GoogleContext.jsx y englobamos a toda nuestra app (con el mismo proposito que AuthContext.jsx).
- `./pages/..` Unos pequeños cambios en algunas paginas.

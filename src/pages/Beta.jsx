import React from "react";
import { useGoogle } from "../context/GoogleContext";

const Beta = () => {
  const { googleToken, googleUser, initializeGoogle } = useGoogle();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Integración con Google</h1>

      {!googleUser ? (
        <button
          onClick={initializeGoogle}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Iniciar sesión con Google
        </button>
      ) : (
        <div className="mt-4">
          <p className="text-green-700 font-semibold">Sesión iniciada:</p>
          <p><strong>Nombre:</strong> {googleUser.name}</p>
          <p><strong>Email:</strong> {googleUser.email}</p>
        </div>
      )}

      {googleToken && (
        <div className="mt-4">
          <p className="text-gray-500 text-sm break-all">
            <strong>Access Token:</strong> {googleToken}
          </p>
        </div>
      )}
    </div>
  );
};

export default Beta;

// import { useEffect, useRef, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// // Tus credenciales
// const CLIENT_ID = "1007029164830-ssanorn533i50fkcpmekoha6igbmsj4q.apps.googleusercontent.com";
// const API_KEY = "AIzaSyAVD67rpIDCdxYNJ5xoLpvcsiSVN9DwZMY";
// const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
// const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

// export default function GoogleCalendarPage() {
//   const [events, setEvents] = useState([]);
//   const tokenClientRef = useRef(null);

//   useEffect(() => {
//     const loadScripts = async () => {
//       // gapi
//       const gapiScript = document.createElement("script");
//       gapiScript.src = "https://apis.google.com/js/api.js";
//       gapiScript.onload = () => window.gapi.load("client", initGapiClient);
//       document.body.appendChild(gapiScript);

//       // GIS
//       const gisScript = document.createElement("script");
//       gisScript.src = "https://accounts.google.com/gsi/client";
//       gisScript.onload = initTokenClient;
//       document.body.appendChild(gisScript);
//     };

//     const initGapiClient = async () => {
//       await window.gapi.client.init({
//         apiKey: API_KEY,
//         discoveryDocs: [DISCOVERY_DOC],
//       });
//     };

//     const initTokenClient = () => {
//       tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
//         client_id: CLIENT_ID,
//         scope: SCOPES,
//         callback: async (tokenResponse) => {
//           if (tokenResponse.error) return console.error(tokenResponse);
//           await fetchEvents();
//         },
//       });
//     };

//     loadScripts();
//   }, []);

//   const handleAuth = () => {
//     tokenClientRef.current?.requestAccessToken();
//   };

//   const fetchEvents = async () => {
//     try {
//       const now = new Date().toISOString();
//       const res = await window.gapi.client.calendar.events.list({
//         calendarId: "primary",
//         timeMin: now,
//         showDeleted: false,
//         singleEvents: true,
//         maxResults: 100,
//         orderBy: "startTime",
//       });

//       const formatted = (res.result.items || []).map((evt) => ({
//         title: evt.summary || "(Sin título)",
//         start: evt.start.dateTime || evt.start.date,
//         end: evt.end?.dateTime || evt.end?.date || evt.start.date,
//         allDay: !evt.start.dateTime,
//       }));

//       setEvents(formatted);
//     } catch (error) {
//       console.error("Error al obtener eventos:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Calendario Google</h2>
//       <button
//         onClick={handleAuth}
//         className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Conectar y cargar calendario
//       </button>

//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         height="auto"
//         locale="es"
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "",
//         }}
//       />
//     </div>
//   );
// }

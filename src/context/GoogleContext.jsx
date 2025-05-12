import { createContext, useContext, useEffect, useState } from "react";

const GoogleContext = createContext();

export const GoogleProvider = ({ children }) => {
  const [googleToken, setGoogleToken] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);

  // Detectar si ya está autorizado
  const initializeGoogle = () => {
    /* global google */
    google.accounts.oauth2.initTokenClient({
      client_id:"1007029164830-ssanorn533i50fkcpmekoha6igbmsj4q.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.events",
      callback: (response) => {
        if (response.access_token) {
          setGoogleToken(response.access_token);
          fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${response.access_token}` },
          })
            .then(res => res.json())
            .then(data => setGoogleUser(data))
            .catch(err => console.error("Error al obtener perfil de Google", err));
        }
      },
    }).requestAccessToken();
  };

  return (
    <GoogleContext.Provider value={{ googleToken, googleUser, initializeGoogle }}>
      {children}
    </GoogleContext.Provider>
  );
};

export const useGoogle = () => useContext(GoogleContext);

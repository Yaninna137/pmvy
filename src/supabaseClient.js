// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Aquí pones tus datos reales del proyecto
const supabaseUrl = 'https://nvhqvvrlwkpuozlxdsmv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52aHF2dnJsd2twdW96bHhkc212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3OTI4OTEsImV4cCI6MjA2MTM2ODg5MX0.EAX9QcZQSIae31N2tcRnV-31v2TDXCbM8Bt6_NZ8dq4'; // Esta es la Public API Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Asegura que la sesión persista entre refrescos y cambios de página
    autoRefreshToken: true, // Mantiene actualizado el token automáticamente
    detectSessionInUrl: true, // Si el token está en la URL, lo usa
  },
});
// // src/supabaseClient.js
// import { createClient } from '@supabase/supabase-js';

// // Aquí pones tus datos reales del proyecto
// const supabaseUrl = 'https://lcqgdbcmhlasgihyceph.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcWdkYmNtaGxhc2dpaHljZXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MjUwNDksImV4cCI6MjA2MTAwMTA0OX0.ZQ9sZdPabnBwhHd10oB42PhLtBgZ3f6x5AGHYQ_JXNc'; // Esta es la Public API Key

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true, // Asegura que la sesión persista entre refrescos y cambios de página
//     autoRefreshToken: true, // Mantiene actualizado el token automáticamente
//     detectSessionInUrl: true, // Si el token está en la URL, lo usa
//   },
// });
// src/pages/Calendario.jsx
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { gapi } from 'gapi-script'
import Navbar from './NavBar'

const CalendarioGoogle = () => {
  const [events, setEvents] = useState([])

  const CLIENT_ID = '1007029164830-ssanorn533i50fkcpmekoha6igbmsj4q.apps.googleusercontent.com'
  const API_KEY = 'AIzaSyAVD67rpIDCdxYNJ5xoLpvcsiSVN9DwZMY'
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: SCOPES
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
          loadEvents()
        })
      })
    }

    gapi.load('client:auth2', initClient)
  }, [])

  const loadEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 50,
        orderBy: 'startTime'
      })
      .then((response) => {
        const events = response.result.items.map((event) => ({
          title: event.summary,
          start: event.start.dateTime || event.start.date,
          end: event.end?.dateTime || event.end?.date
        }))
        setEvents(events)
      })
  }

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Calendario de Turnos</h1>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          height="auto"
        />
      </div>
    </div>
  )
}

export default CalendarioGoogle

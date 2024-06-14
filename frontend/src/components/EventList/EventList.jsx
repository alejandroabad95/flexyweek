import React from 'react';
import { Paper, useTheme, List, Typography } from '@mui/material';
import EventListItem from './EventListItem';


const EventList = ({ events, onToggleCompleted, onToggleEventDay, maxHeight, isToday,  showNext }) => {

  const theme = useTheme();

  // Diccionario para traducir los días
  const dayTranslations = {
    'Mon': 'Lunes',
    'Tue': 'Martes',
    'Wed': 'Miércoles',
    'Thu': 'Jueves',
    'Fri': 'Viernes',
    'Sat': 'Sábado',
    'Sun': 'Domingo'
  };

  // Función para traducir y agrupar eventos por día
  const groupEventsByDay = (events) => {
    const grouped = {};
    events.forEach(event => {
      const dayKey = event.day; // Ajusta la propiedad que representa el día según tu estructura de datos
      const dayTranslated = dayTranslations[dayKey] || dayKey; // Traducir el día si existe en dayTranslations
      if (!grouped[dayTranslated]) {
        grouped[dayTranslated] = [];
      }
      grouped[dayTranslated].push(event);
    });
    return grouped;
  };

  // Agrupar los eventos por día usando la función definida
  const groupedEvents = groupEventsByDay(events);



  console.log(events)
  return (
    <Paper elevation={0}
      
      sx={{
        // Cambiar a Secondary
        backgroundColor: theme.palette.secondary.main,
        border: 'transparent',
        marginTop: '1vh',
        
      }}>
      
      {/* Máximo que sume 60vh */}
      
      <List sx={{ maxHeight: maxHeight, overflowY: 'auto' }}>
        
        {Object.keys(groupedEvents).map(day => (
          <>
            <Typography variant="h3" sx={{display:'flex', justifyContent:'center', fontStyle:'italic'}}>{day}</Typography>

            {groupedEvents[day].map(event => (
              <EventListItem
                key={event.id}
                event={event}
                onToggleCompleted={onToggleCompleted}
                onToggleEventDay={onToggleEventDay}
                showNext={showNext}
                isToday={isToday}
              />
            ))}
          </>
        ))}


        {/* {events.map(event => (
          <>
          <EventListItem
            key={event.id}
            event={event}
            onToggleCompleted={onToggleCompleted}
            onToggleEventDay={onToggleEventDay}
            showNext={showNext}
            isToday={isToday}
            />
          </>
         
        ))} */}



        </List>
    </Paper>
  );
};

export default EventList;

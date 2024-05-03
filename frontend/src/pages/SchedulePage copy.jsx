import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Container, ListItem, ListItemText, List } from '@mui/material';
import { getEventsToday, getEventsCompleted, getEventsNext } from '../services/event.service'; // Asegúrate de importar tu servicio de axios correctamente

const SchedulePage = () => {
  const [eventsToday, setEventsToday] = useState([]);
  const [eventsCompleted, setEventsCompleted] = useState([]);
  const [eventsNext, setEventsNext] = useState([]);
  

  useEffect(() => {
    fetchEventsToday();
    fetchEventsCompleted();
    fetchEventsNext();
  }, []);

  const fetchEventsToday = async () => {
    try {
      const events = await getEventsToday();
      setEventsToday(events);
    } catch (error) {
      console.error('Hubo un problema al obtener los eventos de hoy:', error.message);
    }
  };

  const fetchEventsCompleted = async () => {
    try {
      const events = await getEventsCompleted(); // Obtener eventos completados
      setEventsCompleted(events);
    } catch (error) {
      console.error('Hubo un problema al obtener los eventos completados:', error.message);
    }
  };

  const fetchEventsNext = async () => {
    try {
      const events = await getEventsNext(); // Obtener eventos próximos
      setEventsNext(events);
    } catch (error) {
      console.error('Hubo un problema al obtener los eventos próximos:', error.message);
    }
  };



  return (
    <Container>
      {/* Tabla de tareas */}
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper variant="outlined" sx={{ background: 'transparent', border: 'transparent' }}>
            <Typography variant="subtitle1">Finalizadas</Typography>
            {/* Contenido de la columna de tareas completadas */}
            <List>
              {eventsCompleted.map(event => (
                <ListItem key={event.id}>
                  <ListItemText primary={event.activity_name} secondary={event.goal} />
                </ListItem>
              ))}
            </List>

          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper variant="outlined" sx={{ background: 'transparent', border: 'transparent' }}>
            <Typography variant="subtitle1">Hoy</Typography>
            <List>
              {eventsToday.map(event => (
                <ListItem key={event.id}>
                  <ListItemText primary={event.activity_name} secondary={event.goal} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper variant="outlined" sx={{ background: 'transparent', border: 'transparent' }}>
            <Typography variant="subtitle1">Próximos</Typography>
            {/* Contenido de la columna de tareas próximamente */}
            <List>
              {eventsNext.map(event => (
                <ListItem key={event.id}>
                  <ListItemText primary={event.activity_name} secondary={event.goal} />
                </ListItem>
              ))}
            </List>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SchedulePage;

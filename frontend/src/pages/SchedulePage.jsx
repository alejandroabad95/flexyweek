import React, { useState, useEffect } from 'react';
import { Container, Grid, FormControlLabel, Switch, Button } from '@mui/material';
import { getEventsToday, getEventsCompleted, getEventsNext, updateEventCompleted, updateEventDay } from '../services/event.service';
import EventListToday from '../components/EventList/EventListToday';
import EventListFuture from '../components/EventList/EventListFuture';


const SchedulePage = () => {
  const [eventsToday, setEventsToday] = useState([]);
  const [eventsNext, setEventsNext] = useState([]);

  const [eventsCompleted, setEventsCompleted] = useState([]);
  const [showNext, setShowNext] = useState(false);
  
  useEffect(() => {
    fetchEventsToday();
    fetchEventsCompleted();
    if (showNext) {
      fetchEventsNext(); // Llama a fetchEventsNext solo si showNext es verdadero
  }
  }, [showNext]);


  const fetchEventsToday = async () => {
    try {
      const events = await getEventsToday();
      setEventsToday(events);
    } catch (error) {
      console.error('Error fetching today events:', error.message);
    }
  };

  const fetchEventsCompleted = async () => {
    try {
      const events = await getEventsCompleted();
      setEventsCompleted(events);
    } catch (error) {
      console.error('Error fetching completed events:', error.message);
    }
  };

  const fetchEventsNext = async () => {
    try {
      const events = await getEventsNext();
      setEventsNext(events);
    } catch (error) {
      console.error('Error fetching next events:', error.message);
    }
  };

  const handleToggleCompleted = async (eventId) => {
    try {
      await updateEventCompleted(eventId);
      fetchEventsCompleted();
      fetchEventsToday();
      console.log('marcado')
    } catch (error) {
      console.error('Error updating event completion status:', error.message);
    }
  };

  const handleToggleEventDay = async (eventId, direction) => {
    try {
      await updateEventDay(eventId, direction);
      fetchEventsToday();
    } catch (error) {
      console.error('Error updating event day:', error.message);
    }
  };

  return (
    <>
    <Container sx={{height: '100%'}}>
        <Grid container>
          
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControlLabel
            control={
              <Switch
                checked={showNext}
                onChange={() => setShowNext(!showNext)}
                color="secondary"
                size='small'
              />
            }
            label="Próximos eventos"
          />
        </Grid>


        <Grid item xs={!showNext ? 12 : 6} sx={{ marginTop: '2vh' }}>
          <EventListToday
            eventsToday={eventsToday}
            eventsCompleted={eventsCompleted}
            onToggleCompleted={handleToggleCompleted}
            onToggleEventDay={handleToggleEventDay}
            showNext={showNext}
          />
          </Grid>
          
          {/* Grid de eventos futuros */}
          { showNext && (
          
            <Grid item xs={6} sx={{ marginTop: '2vh' }}>
              
               <EventListFuture
                eventsNext={eventsNext}
                onToggleCompleted={handleToggleCompleted}
                onToggleEventDay={handleToggleEventDay}
              />
          
          </Grid>
          
          )
          }
          
      </Grid>
      </Container>
      
      {/* Botón "Resumen Semanal" */}
      <Button 
        variant="contained" 
        color="secondary"
        sx={{
          position: 'fixed',
          bottom: `calc(50px + 5vh)`,  // Ajusta la posición vertical según tus necesidades
          left: '50%',  // Centra horizontalmente el botón
          transform: 'translateX(-50%)',  // Desplaza el botón hacia la izquierda en un 50% de su propio ancho
          zIndex: 1000,    // Asegura que el botón esté por encima de otros elementos
        }}
      >
        Resumen Semanal
      </Button>


    

    </>
    
    
    
    
    
    
  );
};

export default SchedulePage;

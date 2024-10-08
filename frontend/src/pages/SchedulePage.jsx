import React, { useState, useEffect } from 'react';
import { Container, Grid, FormControlLabel, Switch, Button, Typography, useMediaQuery } from '@mui/material';
import { getEvents, getEventsPast, getEventsToday, getEventsNext, updateEventCompleted, updateEventDay } from '../services/event.service';
import EventList from '../components/EventList/EventList';
import DrawerResume from '../components/DrawerResume/DrawerResume';

const SchedulePage = () => {
  
  // Estados para almacenar eventos
  const [events, setEvents] = useState([]);
  const [eventsToday, setEventsToday] = useState([]);
  const [eventsNext, setEventsNext] = useState([]);
  const [eventsPast, setEventsPast] = useState([]); // Añadido para eventos pasados

  const [showNext, setShowNext] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-height:700px)');

  useEffect(() => {
    fetchEventsToday();
    if (showNext) {
      fetchEventsNext();
    }
  }, [showNext]);

  useEffect(() => {
    if (isDrawerOpen) {
      
      fetchEvents(); // Obtener todos los eventos (por ejemplo, para estadísticas generales)
      fetchEventsNext(); // Obtiene eventos futuros
      fetchEventsPast(); // Obtener eventos pasados cuando se abre el Drawer
    }
  }, [isDrawerOpen]);

  // Funciones para obtener eventos
  const fetchEvents = async () => {
    try {
      const events = await getEvents();
      setEvents(events);
    } catch (error) {
      console.error('Error fetching all events:', error.message);
    }
  };

  const fetchEventsPast = async () => {
    try {
      const events = await getEventsPast();
      setEventsPast(events); // Guardar eventos pasados en el estado correspondiente
    } catch (error) {
      console.error('Error fetching past events:', error.message);
    }
  };

  const fetchEventsToday = async () => {
    try {
      const events = await getEventsToday();
      setEventsToday(events);
    } catch (error) {
      console.error('Error fetching today events:', error.message);
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
      fetchEvents();
      fetchEventsToday(); // Refrescar eventos de hoy
      fetchEventsPast();  // Refrescar eventos pasados
      fetchEventsNext();  // Refrescar eventos futuros
    } catch (error) {
      console.error('Error updating event completion status:', error.message);
    }
  };

  const handleToggleEventDay = async (eventId, direction) => {
    try {
      await updateEventDay(eventId, direction);
      fetchEvents();
      fetchEventsToday();
      fetchEventsNext();
      fetchEventsPast(); // Refrescar también los eventos pasados si se cambian de día
    } catch (error) {
      console.error('Error updating event day:', error.message);
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Container sx={{ height: '100%', paddingLeft: '8px', paddingRight: '8px' }}>
        <Grid container sx={{}}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              variant="contained"
              color="info"
              size="small"
              onClick={handleDrawerOpen}
              sx={{
                // Ajusta este valor para que el botón no se superponga con el footer
              }}
            >
              Resumen
            </Button>
            <FormControlLabel
              control={
                <Switch
                  checked={showNext}
                  onChange={() => setShowNext(!showNext)}
                  color="info"
                  size="small"
                />
              }
              label="Próximos"
            />
          </Grid>
          <Grid item xs={!showNext ? 12 : 6}>
            <Typography variant="h1" sx={{ margin: '2vh', textDecoration: 'underline', textDecorationSkipInk: 'none' }}>Hoy</Typography>
            {eventsToday.length > 0 && (
              <EventList
                events={eventsToday}
                onToggleCompleted={handleToggleCompleted}
                onToggleEventDay={handleToggleEventDay}
                isToday={true}

                isResume={false}

                showNext={showNext}
                maxHeight={isSmallScreen ? '58vh' : '61vh'}
              />
            )}
          </Grid>

          {showNext && (
            <Grid item xs={6} sx={{}}>
              <>
                <Typography variant="h1" sx={{ margin: '2vh', textDecoration: 'underline', textDecorationSkipInk: 'none' }}>Próximos</Typography>
                <EventList
                  events={eventsNext}
                  onToggleCompleted={handleToggleCompleted}
                  onToggleEventDay={handleToggleEventDay}
                  isToday={false}

                  isResume={false}

                  showNext={showNext}
                  maxHeight={isSmallScreen ? '58vh' : '61vh'}
                />
              </>
            </Grid>
          )}
        </Grid>
      </Container>

      <DrawerResume
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        events={events} // Todos los eventos
        eventsPast={eventsPast} // Eventos pasados
        eventsToday={eventsToday} // Eventos de hoy
        eventsNext={eventsNext} // Eventos futuros
        onToggleCompleted={handleToggleCompleted}
        onToggleEventDay={handleToggleEventDay}
       
        isToday={true}

        showNext={showNext}


        maxHeight={isSmallScreen ? '18vh' : '35vh'}
      />
    </>
  );
};

export default SchedulePage;

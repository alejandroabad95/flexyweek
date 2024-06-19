import React, { useState } from 'react';
import { Drawer, Typography, Grid, List, ListItem, ListItemText, ButtonGroup, Button, useTheme } from '@mui/material';
import EventList from '../EventList/EventList';

const DrawerResume = ({ isOpen, onClose, events, eventsPast, eventsToday, eventsNext, onToggleCompleted, onToggleEventDay,isToday, showNext, maxHeight }) => {
  const theme = useTheme();
  const [completedFilter, setCompletedFilter] = useState(null); // Estado para el filtro de completado
  const [timeFilter, setTimeFilter] = useState('default'); // Estado para el filtro de tiempo: 'past', 'today', 'next'

  // Manejar el cambio de filtro por completado
  const handleCompletedFilter = (completed) => {
    setCompletedFilter(completed === completedFilter ? null : completed); // Alternar el filtro si se hace clic nuevamente en el mismo tipo
  };

  // Manejar el cambio de filtro por tiempo
  const handleTimeFilter = (time) => {
    setTimeFilter(time === timeFilter ? 'default' : time); // Alternar el filtro si se hace clic nuevamente en el mismo tipo
  };

  // Filtrar los eventos según los filtros seleccionados
  const filterEvents = () => {
    let filteredEvents = [];

    // Seleccionar eventos según el filtro temporal
    switch (timeFilter) {
      case 'past':
        filteredEvents = eventsPast;
        break;
      case 'today':
        filteredEvents = eventsToday;
        break;
      case 'next':
       
        filteredEvents = eventsNext;
       
        break;
      default:
        filteredEvents = events;
        break;
    }

    // Aplicar filtro de completado
    if (completedFilter !== null) {
      filteredEvents = filteredEvents.filter(event => event.completed === completedFilter);
    }

    return filteredEvents;
  };

  console.log(events)

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
      <div style={{ height: '70vh', padding: 16, background: theme.palette.secondary.main }}>
        <Typography variant="h2">Resumen semanal</Typography>

        {/* Estadísticas */}
        <Grid item xs={12}>
          <Typography variant="h3">Estadísticas</Typography>
          <List>
          
            <div style={{ display: 'flex' }}>
                {/* Primer ListItem */}
                <ListItem sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="h3">{`Nº Eventos: ${events.filter(e => e.completed).length} / ${events.length}`}</Typography>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography variant="h4">{`Tipo hábito: ${events.filter(e => e.activity.activity_type === 1 && e.completed).length} / ${events.filter(e => e.activity.activity_type === 1).length}`}</Typography>
                      <Typography variant="h4">{`Tipo tarea: ${events.filter(e => e.activity.activity_type === 2 && e.completed).length} / ${events.filter(e => e.activity.activity_type === 2).length}`}</Typography>
                    </div>
                  </ListItemText>
                </ListItem>

                {/* Segundo ListItem de actividades */}
                {/* <ListItem sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="h3">{`Otro título aquí`}</Typography>
                    <Typography variant="h4">{`Información adicional`}</Typography>
                    <Typography variant="h4">{`Más detalles`}</Typography>
                  </ListItemText>
                </ListItem> */}
            </div>
            
               {/* <ListItem sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="h3">{`Actividades creadas ${events}`}</Typography>
                    <Typography variant="h4">{`Información adicional`}</Typography>
                    <Typography variant="h4">{`Más detalles`}</Typography>
                  </ListItemText>
                </ListItem> */}

            








             {/* <ListItem>
              <ListItemText>
                <Typography variant="h4">{`nº eventos completados: ${events.filter(e => e.completed).length} / ${events.length}`} </Typography>
              </ListItemText>
            </ListItem>




            <ListItem>
              <ListItemText primary={`nº Hábitos completados: ${events.filter(e => e.type === 'habit' && e.completed).length}`} />
            </ListItem>
            <ListItem>

              <ListItemText primary={`nº Tareas completadas: ${events.filter(e => e.type === 'task' && e.completed).length}`} />
            </ListItem>

            <ListItem>
              <ListItemText>
                <Typography variant="h3">{`nº Tareas completadas: ${events.filter(e => e.type === 'task' && e.completed).length}`} </Typography>
              </ListItemText>
            </ListItem> */}



          </List>
        </Grid>

        {/* Filtros de eventos */}
        <Grid item xs={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3">Eventos</Typography>
          </div>

          <ButtonGroup fullWidth variant="outlined" size='small' aria-label="filtrar por tiempo">
            <Button
              variant={timeFilter === 'past' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleTimeFilter('past')}
            >
              <Typography variant='h6'>Pasados</Typography>
            </Button>
            <Button
              variant={timeFilter === 'today' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleTimeFilter('today')}
            >
              <Typography variant='h6'>Hoy</Typography>
            </Button>
            <Button
              variant={timeFilter === 'next' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleTimeFilter('next')}
            >
              <Typography variant='h6'>Próximos</Typography>
            </Button>
          </ButtonGroup>

          <ButtonGroup fullWidth variant="outlined" size='small' aria-label="filtrar por completado" style={{ marginTop: '16px' }}>
            <Button
              variant={completedFilter === false ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleCompletedFilter(false)}
            >
              <Typography variant='h6'>No completados</Typography>
            </Button>
            <Button
              variant={completedFilter === true ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleCompletedFilter(true)}
            >
              <Typography variant='h6'>Completados</Typography>
            </Button>
          </ButtonGroup>

          {/* Lista de eventos filtrados */}
          <EventList
            events={filterEvents()}
            onToggleCompleted={onToggleCompleted}
            onToggleEventDay={onToggleEventDay}

            isToday={
              timeFilter === 'next' ? false : true
            }

            maxHeight={maxHeight}
          />
        </Grid>
      </div>
    </Drawer>
  );
};

export default DrawerResume;

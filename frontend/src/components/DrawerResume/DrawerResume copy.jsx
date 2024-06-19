import React, {useState} from 'react';
import { Drawer, Typography, Grid, List, ListItem, ListItemText, ButtonGroup, Button, useTheme } from '@mui/material';
import EventList from '../EventList/EventList';

const DrawerResume = ({ isOpen, onClose, events, onToggleCompleted, onToggleEventDay, isToday, showNext, maxHeight }) => {



  const theme = useTheme();
  

  const [completedFilter, setCompletedFilter] = useState(null); // Estado para almacenar el tipo de filtro de completado seleccionado: null, true (completados), false (no completados)


  // Función para manejar el clic en los botones de filtro por completado
  const handleCompletedFilter = (completed) => {
    setCompletedFilter(completed === completedFilter ? null : completed); // Alternar el filtro si se hace clic nuevamente en el mismo tipo
  };





  ///-------------------------
// FUNCIÓN DE FILTRADO
//-------------------------
  const filterEvents = () => {

    // Si el filtro temporal es null y el filtro completado es default retorna todos los eventos sin filtro
    if (completedFilter === null) {
      return events; // Mostrar todos los eventos que se traen al drawer sin filtros
    }

    return events.filter(event => event.completed === completedFilter);
  };






  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
      <div style={{ height: '70vh', padding: 16, background: theme.palette.secondary.main }}>
        <Typography variant="h2">Resumen semanal</Typography>

      

          {/* Estadísticas */}
          <Grid item xs={12}>
            <Typography variant="h3">Estadísticas</Typography>
            <List>
              <ListItem>
                <ListItemText primary="nº Eventos completados" />
              </ListItem>
              <ListItem>
                <ListItemText primary="nº Hábitos completados" />
              </ListItem>
              <ListItem>
                <ListItemText primary="nº Tareas completadas" />
              </ListItem>
            </List>
          </Grid>

          {/* Filtros de eventos */}
          <Grid item xs={12}>
           
            <div style={{display:'flex'}}>
            <Typography variant="h3">Eventos</Typography>
            </div>

            <div style={{}}>
            <ButtonGroup fullWidth variant="outlined" size='small'  aria-label="filtrar por tiempo" >
              <Button variant='outlined' color="primary" >
                <Typography variant='h6'>
                  Pasados
                </Typography>
              </Button>

              <Button variant='outlined' color="primary" >
                <Typography variant='h6'>
                  Hoy
                </Typography>
              </Button>

              <Button variant='outlined' color="primary" >
                <Typography variant='h6'>
                  Próximos
                </Typography>
              </Button>
            </ButtonGroup>

             <ButtonGroup fullWidth variant="outlined" size='small' aria-label="filtrar por completado">
              <Button
                variant={completedFilter === false ? 'contained' : 'outlined'}

                color="primary"


                onClick={() => handleCompletedFilter(false)}
                
              >
                 <Typography variant='h6'>
                  No completados
                </Typography>
              </Button>
              <Button
                variant={completedFilter === true ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleCompletedFilter(true)}
              >
                 <Typography variant='h6'>
                 Completados
                </Typography>
              </Button>
            </ButtonGroup>
            </div>


          
            {/* Aquí irá la lista de eventos */}
           <EventList
              events={filterEvents()}
              onToggleCompleted={onToggleCompleted}
              onToggleEventDay={onToggleEventDay}
              isToday={isToday}
              showNext={showNext}
              maxHeight={maxHeight} // Ajusta según sea necesario
            />

          

          
          </Grid>
          
           
         
           
              
           

         
        
      </div>
    </Drawer>
  );
};

export default DrawerResume;

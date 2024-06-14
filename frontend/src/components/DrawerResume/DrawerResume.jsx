import React from 'react';
import { Drawer, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';

const DrawerResume = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>


      <div style={{ height: '70vh', padding: 16 }}>

        <Typography variant="h2">Resumen semanal</Typography>

        {/* Contenido del Drawer */}
        <Grid container spacing={4}>
          
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

          {/* Eventos completados */}
          <Grid item xs={12} sx={{textAlign:'center'}}>
            <Typography variant="h3">Eventos Completados</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Día 1: 3 eventos completados" />
              </ListItem>
             
              {/* Otros días y eventos completados */}
            </List>
          </Grid>


           {/* Eventos no completados */}
          <Grid item xs={6}>
            <Typography variant="h3"> No Completados</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Evento 3" />
              </ListItem>
             
              {/* Otros eventos no completados */}
            </List>
          </Grid>



          {/* Eventos activos */}
          <Grid item xs={6}>
            <Typography variant="h3">En Activo</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Evento 1" />
              </ListItem>
              
              {/* Otros eventos activos */}
            </List>
          </Grid>

         



        </Grid>
      </div>
    </Drawer>
  );
};

export default DrawerResume;

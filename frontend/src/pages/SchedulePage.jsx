import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Container, ListItem, ListItemText, ListItemButton, List, FormControlLabel, Switch } from '@mui/material';
import { getEventsToday, getEventsCompleted, getEventsNext } from '../services/event.service';
import Slide from '@mui/material/Slide';


import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';

import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';



const SchedulePage = () => {
  const [eventsToday, setEventsToday] = useState([]);
  const [eventsCompleted, setEventsCompleted] = useState([]);
  const [eventsNext, setEventsNext] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  

  useEffect(() => {
    fetchEventsToday();
    fetchEventsNext();
  }, []);

  useEffect(() => {
    if (showCompleted) {
      fetchEventsCompleted();
    } else {
      fetchEventsToday();
    }
  }, [showCompleted]);

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
      const events = await getEventsCompleted();
      setEventsCompleted(events);
    } catch (error) {
      console.error('Hubo un problema al obtener los eventos completados:', error.message);
    }
  };

  const fetchEventsNext = async () => {
    try {
      const events = await getEventsNext();
      setEventsNext(events);
    } catch (error) {
      console.error('Hubo un problema al obtener los eventos próximos:', error.message);
    }
  };

  return (
    <Container sx={{}}>
      <Grid container>
        
        <Grid item xs={12}>
          <FormControlLabel
            sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1vh' }}
            control={
              <Switch
                checked={showCompleted}
                onChange={() => setShowCompleted(!showCompleted)}
                color="secondary"
                size='small'
              />
            }
            label="Completadas"
          />
        </Grid>


        <Grid container sx={{paddingTop: '1vh'}}>

            {/* Columna finalizadas */}
          <Grid item xs={showCompleted ? 6 : 0}
            sx={{display: showCompleted ? 'flex' : 'none' }}
         
          >
              {/* Sale por la derecha y se esconde por la izquierda cuando está activo showCompleted */}
              <Slide direction='right' in={showCompleted}> 
              <Paper variant="outlined" sx={{ background: 'transparent', border: 'transparent' }}>
                
                  <Typography variant="h4">Finalizados</Typography>
                  <List>
                    {eventsCompleted.map(event => (
                      <ListItem key={event.id}>
                        
                        <ListItemText primary={event.activity_name}
                          
                           secondary={
                          <>
                            <span>
                            {event.goal}
                              <HelpOutlineTwoToneIcon 
                               
                              />
                            </span>
                          </>
                        } 
                        
                        />

                        <ListItemButton>
                        <CheckCircleOutlineIcon/>
                        </ListItemButton>

                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Slide>
          </Grid>
          



        {/* Columna Hoy */}
            <Grid item xs={6}>
               
              <Paper variant="outlined" sx={{ background: 'transparent', border: 'transparent' }}>
                <Typography variant="h4">Hoy</Typography>
                <List>
                  {eventsToday.map(event => (
                    <ListItem key={event.id}>
                      <ListItemText primary={event.activity_name}
                        secondary={
                          <>
                            <span>
                            {event.goal}
                              <HelpOutlineTwoToneIcon 
                               
                              />
                            </span>
                          </>
                        } 
                      />
                    
                      <ListItemButton>
                        <RadioButtonUncheckedTwoToneIcon />
                        <KeyboardDoubleArrowRightRoundedIcon />
                      </ListItemButton>

                    </ListItem>
                  ))}
                </List>
                </Paper>
          </Grid>
          



            
            {/* Columna Próximas */}
          <Grid item xs={6} sx={{display: showCompleted ? 'none' : 'flex' }}>
              {/* Sale cuando no se muestran completadas por la izquierda y se esconde por la derecha */}
              <Slide direction="left" in={!showCompleted}>
              <Paper variant="outlined" sx={{ background: 'transparent', border: 'transparent' }}>
                <Typography variant="h4">Próximos</Typography>
                <List>
                  {eventsNext.map(event => (
                    <ListItem key={event.id}>
                      <ListItemText primary={event.activity_name}
                        
                        secondary={
                          <>
                            <span>
                            {event.goal}
                              <HelpOutlineTwoToneIcon 
                               
                              />
                            </span>
                          </>
                        } 
                      
                      
                      
                      
                      />

                      <ListItemButton>
                        <RadioButtonUncheckedTwoToneIcon />
                        <KeyboardDoubleArrowLeftRoundedIcon/>
                     
                      </ListItemButton>


                       




                    </ListItem>


                    
                    
                  ))}
                </List>
                </Paper>
              </Slide>

          </Grid>
          
        </Grid>
         
      </Grid>
    </Container>
  );
};

export default SchedulePage;

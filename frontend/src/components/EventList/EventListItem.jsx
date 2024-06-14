import React from 'react';
import { Paper, ListItem, ListItemText, Button, Typography, Grid, useTheme } from '@mui/material';
import ForwardTwoToneIcon from '@mui/icons-material/ForwardTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';



const EventListItem = ({ event, onToggleCompleted, onToggleEventDay, isToday, showNext }) => {

  const handleToggleCompleted = () => {
    onToggleCompleted(event.id);
  };

  const handleToggleEventDayPrevious = () => {
    onToggleEventDay(event.id, 'previous');
  };

  const handleToggleEventDayNext = () => {
    onToggleEventDay(event.id, 'next');
  };


  

  const theme = useTheme();

  const isHabit = event.activity.activity_type === 1;
  const isTask = event.activity.activity_type === 2;
  const isCompleted = event.completed;

  console.log(event)
 
  return (

    // <Paper variant="outlined" sx={{ background: event.activity.activity_type === 1 ? 'lightblue' : 'green' }}>
    // Usar showNext para mostar un título u otro
      
    <Paper elevation={4} sx={{
      margin: '2vh',

      border: (isHabit && (theme.borders.borderHabit)) || (isTask && (theme.borders.borderTask)),
      borderRadius: (isHabit && (theme.borders.borderRadiusHabit)) || (isTask && (theme.borders.borderRadiusTask)),
      
     
       
     
     }}>
      
      <ListItem sx={{
        display: 'flex', minHeight: '8vh',
        
        border: (isHabit && (theme.borders.borderHabit)) || (isTask && (theme.borders.borderTask)),
        borderRadius: (isHabit && (theme.borders.borderRadiusHabit)) || (isTask && (theme.borders.borderRadiusTask)),

        
        backgroundColor:
          (
            isHabit &&
            
            (!isCompleted
              ?
              theme.palette.background.paperHabit
              :
              theme.palette.background.paperHabitCompleted
            )
          )
          
          ||
          
          (

            isTask &&
            
            (!isCompleted
              ?
              theme.palette.background.paperTask
              :
              theme.palette.background.paperTaskCompleted
            
            )

          )


      }}>


        {/* Reducir letra en showNext */}
        

        <Grid container alignItems="center">
          {/* TEXTO */}
          <Grid item xs={ !showNext ? 9:12}>
            <ListItemText
              primary={
                <Typography variant="h2" sx={{
                  textDecoration:
                    (isCompleted && isTask) && ('line-through')
                }}
                >
                  {event.activity.name}
                </Typography>
              }
              secondary={
                <Typography variant="h4"
                 sx={{
                  textDecoration:
                    (isCompleted && isTask) && ('line-through')
                }}
                >
                  {event.goal}
                </Typography>
              }
            />
          </Grid>
          
          {/* BOTONES */}
          <Grid item xs={!showNext ? 3 : 12 } sx={{ display: 'flex', flexDirection: !showNext ? 'column' : 'row', justifyContent:'center' }}>
            
            
            {/* Icono de marcar como completado en eventos que son HOY */}
            {isToday && (
            
            !showNext ?
              
                <Button variant={!isCompleted ? 'outlined' : 'contained'} color={(isHabit && ('success')) || (isTask && ('info'))}
            
                  size="small" sx={{}} onClick={handleToggleCompleted}>
              <DoneTwoToneIcon />
            </Button>
                
            :

                <Button variant={!isCompleted ? 'outlined' : 'contained'} color={(isHabit && ('success')) || (isTask && ('info'))}
                  size="small" sx={{ height: '0.99em', padding: '8px', marginTop: '2px' }} onClick={handleToggleCompleted}>
              <DoneTwoToneIcon sx={{ height:'0.8em' }} />
                </Button>
          
            
            )
              
              
              
              
              
              
            }


        


            {!isCompleted &&
              (
              
              <>

                {/* Icono flecha izquierda para eventos próximos */}
                {!isToday && (
              
                  <Button variant="outlined" color="warning" onClick={handleToggleEventDayPrevious}
                    size="small" sx={{ height: '0.99em', padding: '8px', marginTop: '2px' }}
                  >
              
                    <ForwardTwoToneIcon sx={{ height: '0.8em', transform: 'rotate(180deg)' }} />
                
                  </Button>
                  
                )
                }
              
              
              
              <Button variant="outlined" color="warning" onClick={handleToggleEventDayNext}
              size="small" sx={{ height: '0.99em', padding: '8px', marginTop: '2px' }}
              >
              
              <ForwardTwoToneIcon sx={{ height: '0.8em' }} />
                
              </Button>
                


              </>
              
            )
            }
           
          </Grid>
          
        </Grid>
      </ListItem>
    </Paper>


    
    
    
    
    
  );
};

export default EventListItem;

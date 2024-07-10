import React from 'react';
import { Paper, Typography, IconButton, Stack, useTheme } from '@mui/material';
import { Delete, Edit, Settings } from '@mui/icons-material';



const EventPaper = ({event, handleShowMenu, showMenu  ,handleOpenUpdateEventForm,
  handleOpenDeleteEventForm,  handleDragStart,  handleTouchStart,  handleTouchMove,  handleTouchEnd, handleDragOver, handleDrop
}) => {


  const theme = useTheme();
  
  const isHabit = event.activity.activity_type === 1;
  const isTask = event.activity.activity_type === 2;
  const isCompleted = event.completed;

 
  return (
    <Paper
      key={event.id}

      draggable // hace el elemento arrastrable

      onDragStart={(e) => handleDragStart(e, event)} // Maneja el inicio del arrastre, pasando el evento y el objeto de evento como parámetros
      onDragOver={(e) => handleDragOver(e)} // Maneja el evento de arrastre sobre el elemento
      
      onDrop={(e) => handleDrop(e, event)} // Maneja el evento de soltar el elemento en este componente, pasando el evento y el objeto de evento como parámetros

      onTouchStart={(e) => handleTouchStart(e, event)} // Maneja el inicio del toque en el elemento, pasando el evento y el objeto de evento como parámetros
      onTouchMove={handleTouchMove} // Maneja el movimiento del toque en el elemento

      onTouchEnd={handleTouchEnd}

      sx={{
        height: '100%',
        touchAction: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
        // Bordes tarjetas
        border: (isHabit && (theme.borders.borderHabit)) || (isTask && (theme.borders.borderTask)),
        borderRadius: (isHabit && (theme.borders.borderRadiusHabit)) || (isTask && (theme.borders.borderRadiusTask)),
        

       
      }}
    >

    
      {/* Color de background para orientarme */}
      <div 
        
        style={{
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
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

          ),




        // Bordes tarjetas
        border: (isHabit && (theme.borders.borderHabit)) || (isTask && (theme.borders.borderTask)),
        borderRadius: (isHabit && (theme.borders.borderRadiusHabit)) || (isTask && (theme.borders.borderRadiusTask)),
        
      
       }}>
        

        <div style={{display:'flex',flex:'0.7', flexDirection:'column', margin:'0px 3px'}}>
          <Typography variant="body1" color="initial" sx={{
            fontWeight: 'bold',
            textDecoration:
              (isCompleted && isTask) && ('line-through')
            


          }}
          
          
          
          >
          {event.activity.name}
          </Typography>
          
        <Typography variant="body2" color="initial"
            sx={{
            textDecoration:
              (isCompleted && isTask) && ('line-through')
            
          }}
          
          
          >
          {event.goal ? event.goal : ''}
        </Typography>
        </div>

        {/* Menú de opciones */}

        <div style={{ margin: '0px 5px' }}>
          
        {!showMenu ?
          <div style={{display:'flex', flexDirection:'row-reverse'}}>
            <IconButton onClick={handleShowMenu}   size='small' sx={{width:'0.8em', height:'0.8em'}}>
              <Settings sx={{width:'0.8em', height:'0.8em',color: theme.palette.icon.gear}} />
            </IconButton>
          </div>

              :

              <Stack direction="row" spacing={2} sx={{justifyContent:'flex-end'}}>
                
              <IconButton onClick={() => handleOpenUpdateEventForm(event)} size='small' sx={{width:'0.7em', height:'0.7em'}}> 
                <Edit sx={{width:'0.7em', height:'0.7em',color:theme.palette.warning.main}}/>
              </IconButton>
              
              <IconButton onClick={() => handleOpenDeleteEventForm(event)} size="small" sx={{width:'0.7em', height:'0.7em'}} >
                <Delete sx={{width:'0.7em', height:'0.7em',color:theme.palette.danger.main}} />
              </IconButton>


             
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size='small' onClick={handleShowMenu} sx={{width:'0.5em', height:'0.5em'}}>
                <Settings sx={{width:'0.5em', height:'0.5em', color: theme.palette.icon.gear}}/>
              </IconButton>
              </div>    
            
                


              </Stack>
          }
          </div>



      </div>
    </Paper>
  );
};

export default EventPaper;

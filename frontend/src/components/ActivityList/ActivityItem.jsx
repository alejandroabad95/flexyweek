import React from 'react';
import { ListItem, IconButton, TextField, Typography, Paper, Stack, useTheme } from '@mui/material';
import { Delete, Edit, Settings } from '@mui/icons-material';

const ActivityItem = ({ activity, editingActivityId, updatedActivityName, handleUpdatedActivityNameChange, handleSaveUpdatedActivity, handleEditActivity, showMenu, handleShowMenu, handleDeleteActivity, editingActivityInputRef }) =>

{

  const theme = useTheme();
  
  const isEditing = editingActivityId === activity.id;
  const isHabit = activity.activity_type === 1;
  const isTask = activity.activity_type === 2;


  return(

    <Paper elevation={isEditing ? 0 : 4} sx={{
      margin: '1.2vh',
      border:
        isEditing
        
        ?
        ''
        :
        (isHabit && (theme.borders.borderHabit)) || (isTask && (theme.borders.borderTask)),
        
      borderRadius:
        isEditing
          
        ?
        ''
        
        :
        (isHabit && (theme.borders.borderRadiusHabit)) || (isTask && (theme.borders.borderRadiusTask)),
      


  }}>
  
  {/* Actividad con el texto izda y la ruleta de opciones a la derecha */}
      <ListItem sx={{
        display: 'flex', justifyContent: 'space-between', minHeight: '6vh', paddingRight: '8px',

        border:
          isEditing
          ?
            ''
          :
          (isHabit && (theme.borders.borderHabit)) || (isTask && (theme.borders.borderTask)),
        
        borderRadius:
          isEditing
          ?
          ''
          :
          (isHabit && (theme.borders.borderRadiusHabit)) || (isTask && (theme.borders.borderRadiusTask)),
      


        // color de fondo
        backgroundColor:
          isEditing
          ?
          theme.palette.secondary.main
          :
        (isHabit && (theme.palette.background.paperHabit)) || (isTask && (theme.palette.background.paperTask))
        
        
        
      }}>

    {isEditing ? (
          <>
       
        <TextField
          value={updatedActivityName}
          onChange={handleUpdatedActivityNameChange}
          inputRef={editingActivityInputRef}
          fullWidth
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              handleSaveUpdatedActivity(activity.id);
            }
          }}
          inputProps={{
          sx: {
            fontSize: theme.typography.h4,
          
          },
        }}
              
              />
        
        
      </>
      ) : (
        <>
          <Typography variant="h2">
            {activity.name}
          </Typography>

          { !showMenu ?

            <IconButton onClick={handleShowMenu} size='small'>
              <Settings sx={{color: theme.palette.icon.gear}} />
            </IconButton>
              
              :

              <Stack direction="row" spacing={1} sx={{ }}>
                
              <IconButton onClick={() => handleEditActivity(activity)} size='small'> 
                <Edit sx={{color:theme.palette.warning.main}}/>
              </IconButton>
              
              <IconButton onClick={() => handleDeleteActivity(activity.id)} size="small">
                <Delete sx={{color:theme.palette.danger.main}} />
              </IconButton>


              <div style={{ display: 'flex', alignItems: 'center' }}>
                    
              <IconButton size='small' onClick={handleShowMenu} sx={{width:'0.5em', height:'0.5em'}}>
                <Settings sx={{width:'0.5em', height:'0.5em', color: theme.palette.icon.gear}}/>
              </IconButton>
                    
              </div>
                


              </Stack>
          }

      </>
          

    )}
    </ListItem>
  
  </Paper>

  )
  };

export default ActivityItem;

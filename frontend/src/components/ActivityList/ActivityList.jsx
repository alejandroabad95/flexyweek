import React from 'react';
import { Grid, IconButton, Typography, List, Collapse, Paper, useTheme } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';
import ActivityItem from './ActivityItem';
import CreateActivityForm from '../Forms/CreateActivityForm';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


const ActivityList = ({filteredActivities,handleTypeChange,currentType, isAddingActivity, newActivityName,handleNewActivityNameChange, handleAddActivity,
errors, editingActivityId, updatedActivityName,handleUpdatedActivityNameChange,handleSaveUpdatedActivity,handleEditActivity,handleDeleteActivity,handleStartAddActivity,newActivityInputRef,
editingActivityInputRef, handleShowMenu, showMenu
  
}) => {

  const theme = useTheme();


  return (
    <>

    {/* Título de tipo de actividad */}
      
    <Grid container justifyContent="space-evenly" alignItems="center" sx={{mb:1}}>
        
        <IconButton onClick={() => handleTypeChange('previous')}>
          <ArrowLeft fontSize='large' sx={{color:'black'}} />
        </IconButton>
        <Typography variant="h1">
          {currentType === 1 ? 'Hábito' : 'Tarea'}
        </Typography>
        <IconButton onClick={() => handleTypeChange('next')}>
          <ArrowRight fontSize='large' sx={{color:'black'}}  />
        </IconButton>

    </Grid>
    
    {/* Botón de añadir */}
    
    <Grid container sx={{ mb:1, display: 'flex', justifyContent: 'center'}}>
        <Grid item xs={12} sx={{}}>
         
          <IconButton
            onClick={handleStartAddActivity}
            size="medium"
            sx={{
              position: 'relative',
              color: theme.palette.success.main
            }}
          >
            {isAddingActivity || editingActivityId ? (

              <>
              
              </>

            ) : (
              <AddBoxIcon fontSize="large" />
            )}
          </IconButton>

          
         {/* Se genera solo cuando hay error de límite de actividades */}
          {errors.serverLimitActivities && <ErrorMessage message={errors.serverLimitActivities} />} 
          
          {errors.serverCreateActivity && <ErrorMessage message={errors.serverAddActivity} />} 

          {errors.serverEditActivity && <ErrorMessage message={errors.serverEditActivity} />} 

          

          {isAddingActivity && (
          <CreateActivityForm
              newActivityName={newActivityName}
              handleNewActivityNameChange={handleNewActivityNameChange}
              handleAddActivity={handleAddActivity}
              newActivityInputRef={newActivityInputRef}
              errors={errors}
            />
          )}
          
        </Grid>


       
        {errors && <ErrorMessage message={errors.serverLimitActivities} />} 
        
        
      </Grid>

      {/* Lista de actividades */}
      <Paper elevation={0} 
        sx={{
          backgroundColor: theme.palette.secondary.main , overflowY: 'auto', maxHeight: '62vh', mt: 1,
          width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center',
        }}>
      <List sx={{width:'100%', borderRadius:'16px'}}>
        <TransitionGroup >
          {filteredActivities.map(activity => (
            <Collapse key={activity.id}>
              <ActivityItem
                activity={activity}
                editingActivityId={editingActivityId}
                updatedActivityName={updatedActivityName}
                handleUpdatedActivityNameChange={handleUpdatedActivityNameChange}
                handleSaveUpdatedActivity={handleSaveUpdatedActivity}
                handleEditActivity={handleEditActivity}
                showMenu={showMenu}
                handleShowMenu={handleShowMenu}
                handleDeleteActivity={handleDeleteActivity}
                editingActivityInputRef={editingActivityInputRef}
                errors={errors}
              />
            </Collapse>
          ))}
        </TransitionGroup>
        </List>
      </Paper>
    
      
    </>
    
  );
};

export default ActivityList;

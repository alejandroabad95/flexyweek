import React from 'react';
import { Grid, IconButton, Typography, Button, List, Collapse } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';
import ActivityItem from './ActivityItem';
import CreateActivityForm from '../Forms/CreateActivityForm';

const ActivityList = ({filteredActivities,handleTypeChange,currentType, isAddingActivity, newActivityName,handleNewActivityNameChange, handleAddActivity,
error, editingActivityId, updatedActivityName,handleUpdatedActivityNameChange,handleSaveUpdatedActivity,handleEditActivity,handleDeleteActivity,handleStartAddActivity,newActivityInputRef,
editingActivityInputRef
  
}) => {

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <IconButton onClick={() => handleTypeChange('previous')}>
          <ArrowLeft />
        </IconButton>
        <Typography variant="h4">
          {currentType === 1 ? 'Hábito' : 'Tarea'}
        </Typography>
        <IconButton onClick={() => handleTypeChange('next')}>
          <ArrowRight />
        </IconButton>
      </Grid>
      
      <Grid container sx={{ marginTop: '1vh', display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size='small'
            color="warning"
            onClick={handleStartAddActivity}
          >
            Añadir
          </Button>
          {isAddingActivity && (
            <CreateActivityForm
              newActivityName={newActivityName}
              handleNewActivityNameChange={handleNewActivityNameChange}
              handleAddActivity={handleAddActivity}
              newActivityInputRef={newActivityInputRef}
            />
          )}
        </Grid>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Grid>

      <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent:'center', overflowY: 'auto', maxHeight: '50vh'}}>
        <TransitionGroup>
          {filteredActivities.map(activity => (
            <Collapse key={activity.id}>
              <ActivityItem
                activity={activity}
                editingActivityId={editingActivityId}
                updatedActivityName={updatedActivityName}
                handleUpdatedActivityNameChange={handleUpdatedActivityNameChange}
                handleSaveUpdatedActivity={handleSaveUpdatedActivity}
                handleEditActivity={handleEditActivity}
                handleDeleteActivity={handleDeleteActivity}
                editingActivityInputRef={editingActivityInputRef}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Grid>
  );
};

export default ActivityList;

import React from 'react';
import { Grid, IconButton, Typography, Button, Card, CardContent, TextField, List, ListItem, Collapse } from '@mui/material';
import { ArrowLeft, ArrowRight, Check, Delete } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';

const SingleColumnActivityList = ({
  filteredActivities,
  handleTypeChange,
  currentType,
  isAddingActivity,
  newActivityName,
  handleNewActivityNameChange,
  handleAddActivity,
  error,
  editingActivityId,
  updatedActivityName,
  handleUpdatedActivityNameChange,
  handleSaveUpdatedActivity,
  handleEditActivity,
  handleDeleteActivity,
  handleStartAddActivity,
  newActivityInputRef,
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
            <Card className="adding-activity-item">
              <CardContent>
                <TextField
                  label="Nombre de la actividad"
                  value={newActivityName}
                  onChange={handleNewActivityNameChange}
                  inputRef={newActivityInputRef}
                  fullWidth
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                      handleAddActivity();
                    }
                  }}
                />
                <IconButton
                  color="primary"
                  onClick={handleAddActivity}
                >
                  <Check />
                </IconButton>
              </CardContent>
            </Card>
          )}
        </Grid>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Grid>

      <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent:'center', overflowY: 'auto', maxHeight: '50vh'}}>
        <TransitionGroup>
          {filteredActivities.map(activity => (
            <Collapse key={activity.id}>
              <ListItem style={{ paddingBottom: '0px', marginBottom: '0px', display:'flex', justifyContent: 'center'}}>
               
                    {editingActivityId === activity.id ? (
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
                        />
                        <IconButton
                          color="primary"
                          onClick={() => handleSaveUpdatedActivity(activity.id)}
                        >
                          <Check />
                        </IconButton>
                      </>
                    ) : (
                      <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p onClick={() => handleEditActivity(activity)} sx={{ maxWidth: 'fit-content' }}>
                          {activity.name}
                                  </p>
                                  

                        <IconButton
                          onClick={() => handleDeleteActivity(activity.id)}
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      
                      </Typography>
                    )}
              
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Grid>
  );
};

export default SingleColumnActivityList;

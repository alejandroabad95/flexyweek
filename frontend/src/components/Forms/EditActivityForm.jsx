import React from 'react';
import { TextField, Button,ListItem } from '@mui/material';

const EditActivityForm = ({
  updatedActivityName,
  handleUpdatedActivityNameChange,
  handleSaveUpdatedActivity,
  activityId,
  editingActivityInputRef,
  errors
}) => {

  return (
    

    <ListItem className={`editing-activity-item-${activityId}`} >
    <TextField
      value={updatedActivityName}
      onChange={handleUpdatedActivityNameChange}
      inputRef={editingActivityInputRef}
      fullWidth
        // onKeyUp={handleKeyUp}
        
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          handleSaveUpdatedActivity(activityId);
        }
      }}


      inputProps={{
        sx: {
          fontSize: '1.25rem',
        },
      }}
      error={!!errors.nameActivity}  // Indicar error si existe un error en el nombre de la actividad
      helperText={errors.nameActivity}  // Mostrar mensaje de error si existe
    />

    <Button
      onClick={() => handleSaveUpdatedActivity(activityId)}
      variant="contained"
      color="primary"
        size="large"
        
      style={{ marginLeft: '8px', alignSelf: errors ? 'flex-start' : 'center' }} // Separación visual entre el TextField y el Button
    >
      OK
      </Button>
    
    </ListItem>
 
    




  );
};

export default EditActivityForm;

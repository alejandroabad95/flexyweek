import React from 'react';
import { TextField, ListItem } from '@mui/material';

const CreateActivityForm = ({
  newActivityName,
  handleNewActivityNameChange,
  handleAddActivity,
  newActivityInputRef,
  errors
}) => (

    <ListItem className="adding-activity-item">
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
      sx={{}}

      error={!!errors.nameActivity}
      helperText={errors.nameActivity}

      />
  </ListItem>
  
);

export default CreateActivityForm;

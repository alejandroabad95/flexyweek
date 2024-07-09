import React from 'react';
import { TextField, ListItem, Button } from '@mui/material';

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
      error={!!errors.nameActivity}
      helperText={errors.nameActivity}

      
    />

    <Button
      onClick={handleAddActivity}
      variant="contained"
      color="primary"
      size="large"
      style={{ marginLeft: '8px', alignSelf: 'baseline' }} // Separación visual entre el TextField y el Button
     
    >
      OK
    </Button>


  </ListItem>
);

export default CreateActivityForm;


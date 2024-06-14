import React from 'react';
import { TextField, ListItem } from '@mui/material';

const CreateActivityForm = ({
  newActivityName,
  handleNewActivityNameChange,
  handleAddActivity,
  newActivityInputRef
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
      />
  </ListItem>
  
);

export default CreateActivityForm;

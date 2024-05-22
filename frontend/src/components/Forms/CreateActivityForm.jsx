import React from 'react';
import { Card, CardContent, TextField, IconButton } from '@mui/material';
import { Check } from '@mui/icons-material';

const CreateActivityForm = ({
  newActivityName,
  handleNewActivityNameChange,
  handleAddActivity,
  newActivityInputRef
}) => (
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
      <IconButton color="primary" onClick={handleAddActivity}>
        <Check />
      </IconButton>
    </CardContent>
  </Card>
);

export default CreateActivityForm;

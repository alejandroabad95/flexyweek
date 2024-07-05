import React from 'react';
import { TextField } from '@mui/material';

const EditActivityForm = ({
  updatedActivityName,
  handleUpdatedActivityNameChange,
  handleSaveUpdatedActivity,
  activityId,
  editingActivityInputRef,
  errors
}) => {

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSaveUpdatedActivity(activityId);
    }
  };

  return (
    <TextField
      value={updatedActivityName}
      onChange={handleUpdatedActivityNameChange}
      inputRef={editingActivityInputRef}
      fullWidth
      onKeyUp={handleKeyUp}
      inputProps={{
        sx: {
          fontSize: '1.25rem',
        },
      }}
      error={!!errors.nameActivity}  // Indicar error si existe un error en el nombre de la actividad
      helperText={errors.nameActivity}  // Mostrar mensaje de error si existe
    />
  );
};

export default EditActivityForm;

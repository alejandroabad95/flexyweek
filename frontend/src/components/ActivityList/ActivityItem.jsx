import React from 'react';
import { ListItem, IconButton, TextField, Typography } from '@mui/material';
import { Check, Delete } from '@mui/icons-material';

const ActivityItem = ({ activity,editingActivityId,updatedActivityName,handleUpdatedActivityNameChange,handleSaveUpdatedActivity,handleEditActivity,handleDeleteActivity,editingActivityInputRef }) => (
  <ListItem style={{ paddingBottom: '0px', marginBottom: '0px', display: 'flex', justifyContent: 'center' }}>
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
        <IconButton color="primary" onClick={() => handleSaveUpdatedActivity(activity.id)}>
          <Check />
        </IconButton>
      </>
    ) : (
      <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p onClick={() => handleEditActivity(activity)} style={{ maxWidth: 'fit-content', margin: 0 }}>
          {activity.name}
        </p>
        <IconButton onClick={() => handleDeleteActivity(activity.id)} size="small">
          <Delete />
        </IconButton>
      </Typography>
    )}
  </ListItem>
);

export default ActivityItem;

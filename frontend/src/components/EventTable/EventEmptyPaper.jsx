import React from 'react';
import { Paper, Typography } from '@mui/material';

const EventEmptyPaper = ({
  day,
  priority,
  handleDragOver,
  handleDrop,
  handleOpenCreateEventForm
}) => {
  return (
    <Paper
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, day, priority)}
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        touchAction: 'none'
      }}
      onTouchEnd={(e) => handleOpenCreateEventForm(day, priority)}
    >
      <Typography onClick={() => handleOpenCreateEventForm(day, priority)}></Typography>
    </Paper>
  );
};

export default EventEmptyPaper;

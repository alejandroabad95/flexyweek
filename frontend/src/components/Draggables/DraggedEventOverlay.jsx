import React from 'react';
import { Paper, Typography } from '@mui/material';

const DraggedEventOverlay = ({ isDragging, draggedEvent, draggedEventPosition}) => {
  
  if (!isDragging || !draggedEvent ) {
    return null; 
  }

  console.log(draggedEvent)
  
  return (
    <Paper
      sx={{
        position: 'absolute',
        top: draggedEventPosition.y,
        left: draggedEventPosition.x,
        pointerEvents: 'none',
        zIndex: 1000,
        width: '20%',
        height: '10vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1">{draggedEvent.activity.name}</Typography>
      <Typography variant="body2">{draggedEvent.goal}</Typography>
    </Paper>
  );
};

export default DraggedEventOverlay;

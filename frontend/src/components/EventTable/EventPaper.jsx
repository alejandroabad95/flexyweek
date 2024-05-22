import React from 'react';
import { Paper, Typography, Tooltip, Menu, MenuItem } from '@mui/material';

const EventPaper = ({event,  anchorElMap,  selectedMenuEventMap,handleClickMenuOpen,  handleCloseMenu,  handleOpenUpdateEventForm,
  handleOpenDeleteEventForm,  handleDragStart,  handleTouchStart,  handleTouchMove,  handleTouchEnd
}) => {
  return (
    <Paper
      key={event.id}
      draggable
      onDragStart={(e) => handleDragStart(e, event)}
      onTouchStart={(e) => handleTouchStart(e, event)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        height: '100%',
        touchAction: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{ height: '100%', width: '100%', marginTop: '8px' }}>
        <Typography variant="body1" color="initial" sx={{ fontWeight: 'bold' }}>
          {event.activity_name}
        </Typography>
        <Tooltip title={event.goal || ''} arrow>
          <Typography variant="body2" color="initial" onClick={(e) => handleClickMenuOpen(e, event)}>
            {event.goal ? event.goal : '.............'}
          </Typography>
        </Tooltip>
        <Menu
          anchorEl={anchorElMap[event.id]}
          open={Boolean(anchorElMap[event.id]) && selectedMenuEventMap[event.id] === event}
          onClose={() => handleCloseMenu(event)}
        >
          <MenuItem onClick={() => handleOpenUpdateEventForm(event)}>Editar</MenuItem>
          <MenuItem onClick={() => handleOpenDeleteEventForm(event)}>Eliminar</MenuItem>
        </Menu>
      </div>
    </Paper>
  );
};

export default EventPaper;

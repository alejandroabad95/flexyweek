import React from 'react';
import { Paper } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

const EventEmptyPaper = ({
  day,
  priority,
  // handleDragOver,
  // handleDrop,
  handleOpenCreateEventForm
}) => {
  return (
    <Paper
      
      // Eventos para soltar elementos

      // onDragOver={(e) => handleDragOver(e)}
      // onDrop={(e) => handleDrop(e, day, priority)}
      
      onTouchEnd={(e) => handleOpenCreateEventForm(day, priority)}


      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        touchAction: 'none',
        cursor: 'pointer',  // Para indicar que es clicable
        backgroundColor: '#f0f0f0',  // Un color sutil para que sea claro que es interactivo
        '&:hover': {
          backgroundColor: '#e0e0e0',  // Un color más claro en el hover
        }
      }}
      
    >
      <AddBoxIcon
        onClick={() => handleOpenCreateEventForm(day, priority)}
        sx={{
          fontSize: '2rem',  // Tamaño del icono, ajusta según tus necesidades
          color: 'green'  // Color del icono, ajusta según tus necesidades
        }}
      />
    </Paper>
  );
};

export default EventEmptyPaper;

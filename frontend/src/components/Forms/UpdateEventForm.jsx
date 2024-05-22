import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { getActivities } from '../../services/activity.service'; 

const UpdateEventForm = ({ open, handleClose, eventData, handleUpdateEvent }) => {
  const [activity, setActivity] = useState('');
  const [goal, setGoal] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      // Carga de actividades solo cuando el diálogo se abre
      getActivities()
        .then(data => {
          setActivities(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error al cargar actividades:', error.message);
          setLoading(false);
        });
    }
  }, [open]);  

  useEffect(() => {
    // Cuando cambia el evento seleccionado, actualiza los campos del formulario
    if (eventData) {
      setActivity(eventData.activity);
      setGoal(eventData.goal);
    }
  }, [eventData]);  

  const submitForm = () => {
    handleUpdateEvent({ activity, goal });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Actualizar evento</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Select
              value={activity}
              onChange={e => setActivity(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>Selecciona una actividad</MenuItem>
              {activities.map(act => (
                <MenuItem key={act.id} value={act.id}>{act.name}</MenuItem>
              ))}
            </Select>
            <TextField
              margin="dense"
              label="Objetivo"
              type="text"
              fullWidth
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="Opcional"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={submitForm}>Actualizar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateEventForm;

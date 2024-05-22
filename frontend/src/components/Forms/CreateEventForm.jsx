import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, CircularProgress } from '@mui/material';
import { getActivities } from '../../services/activity.service';  // Asegúrate de importar correctamente

const CreateEventForm = ({ open, handleClose, day, priority, handleCreateEvent }) => {
  const [activity, setActivity] = useState('');
  const [goal, setGoal] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      getActivities().then(data => {
        setActivities(data);
        setLoading(false);
      }).catch(error => {
        console.error('Error al cargar actividades:', error.message);
        setLoading(false);
      });
    }
  }, [open]);  // Cargar las actividades solo cuando el diálogo se abre

  const submitForm = () => {
    handleCreateEvent({ day, priority, activity, goal });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Añadir nuevo evento</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
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
        )}
        <TextField
          margin="dense"
          label="Objetivo"
          type="text"
          fullWidth
          value={goal}
          onChange={e => setGoal(e.target.value)}
          placeholder="Opcional"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={submitForm}>Crear</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventForm;

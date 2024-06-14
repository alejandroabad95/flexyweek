import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, ButtonGroup, MenuItem, CircularProgress, Select } from '@mui/material';
import { getActivities } from '../../services/activity.service';

const CreateEventForm = ({ open, handleClose, day, priority, handleCreateEvent }) => {
  const [activity, setActivity] = useState('');
  const [goal, setGoal] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [showHabits, setShowHabits] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  

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
  }, [open]);

  const filterActivities = () => {
    let filtered = activities;
    if (!showHabits) {
      filtered = filtered.filter(act => act.activity_type !== 1);
    }
    if (!showTasks) {
      filtered = filtered.filter(act => act.activity_type !== 2);
    }
    setFilteredActivities(filtered);
  };

  const submitForm = () => {
    console.log('Datos del formulario:', { day, priority, activity, goal });
    handleCreateEvent({ day, priority, activity, goal });
    handleClose();
  };

  useEffect(() => {
    filterActivities();
  }, [showHabits, showTasks, activities]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Añadir nuevo evento</DialogTitle>
      <DialogContent>
        <ButtonGroup fullWidth variant="outlined" aria-label="Filtrar actividades">
          <Button
            onClick={() => setShowHabits(prevState => !prevState)}
            variant={showHabits ? 'contained' : 'outlined'}
            color="primary"
          >
            Hábitos
          </Button>
          <Button
            onClick={() => setShowTasks(prevState => !prevState)}
            variant={showTasks ? 'contained' : 'outlined'}
            color="primary"
          >
            Tareas
          </Button>
        </ButtonGroup>
        <Select
          value={activity}
          onChange={e => setActivity(e.target.value)}
          fullWidth
          displayEmpty
          style={{ marginTop: '1rem' }}
        >
          <MenuItem value="" disabled>Selecciona una actividad</MenuItem>
          {(filteredActivities.length > 0 ? filteredActivities : activities).map(act => (
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
          style={{ marginTop: '1rem' }}
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

import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, ButtonGroup, MenuItem, Select, CircularProgress } from '@mui/material';
import { getActivities } from '../../services/activity.service';

const CreateEventForm = ({ open, handleClose, day, priority, handleCreateEvent }) => {
  const [activity, setActivity] = useState('');
  const [goal, setGoal] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [activityTypeFilter, setActivityTypeFilter] = useState(null); // null = todos, 1 = hábitos, 2 = tareas

  const filterActivities = useCallback(() => {
    let filtered = activities;
    if (activityTypeFilter === 1) {
      filtered = filtered.filter(act => act.activity_type === 1);
    } else if (activityTypeFilter === 2) {
      filtered = filtered.filter(act => act.activity_type === 2);
    }
    setFilteredActivities(filtered);
  }, [activityTypeFilter, activities]);

  useEffect(() => {
    if (open) {
      setLoading(true);
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
    filterActivities();
  }, [filterActivities]);

  const submitForm = () => {
    console.log('Datos del formulario:', { day, priority, activity, goal });
    handleCreateEvent({ day, priority, activity, goal });
    handleClose();
  };

  const handleFilterClick = (type) => {
    setActivityTypeFilter(type === activityTypeFilter ? null : type);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Añadir nuevo evento</DialogTitle>
      <DialogContent>
        {loading && <CircularProgress />} {/* Muestra un indicador de carga si está cargando */}
        <ButtonGroup fullWidth variant="outlined" aria-label="Filtrar actividades">
          <Button
            onClick={() => handleFilterClick(1)}
            variant={activityTypeFilter === 1 ? 'contained' : 'outlined'}
            color="primary"
          >
            Hábitos
          </Button>
          <Button
            onClick={() => handleFilterClick(2)}
            variant={activityTypeFilter === 2 ? 'contained' : 'outlined'}
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

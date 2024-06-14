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
  CircularProgress,
  ButtonGroup
} from '@mui/material';
import { getActivities } from '../../services/activity.service'; 

const UpdateEventForm = ({ open, handleClose, eventData, handleUpdateEvent }) => {
  const [activity, setActivity] = useState('');
  const [goal, setGoal] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [showHabits, setShowHabits] = useState(true); // Por defecto, mostrar hábitos
  const [showTasks, setShowTasks] = useState(true); // Por defecto, mostrar tareas

  useEffect(() => {
    if (open && eventData) {
      setLoading(true);
      getActivities()
        .then(data => {
          // Aplicar filtros
          let filtered = data;
          if (!showHabits) {
            filtered = filtered.filter(act => act.activity_type !== 1);
          }
          if (!showTasks) {
            filtered = filtered.filter(act => act.activity_type !== 2);
          }
          setActivities(filtered);

          // Seleccionar la actividad actual del evento
          setActivity(eventData.activity.id);
          setGoal(eventData.goal);
          
          setLoading(false);
        })
        .catch(error => {
          console.error('Error al cargar actividades:', error.message);
          setLoading(false);
        });
    }
  }, [open, eventData, showHabits, showTasks]);  

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
    console.log('Datos a enviar:', { activity, goal }); 
    handleUpdateEvent({ activity, goal }); // Envía activity y goal al método de actualización
    handleClose();
  };

  useEffect(() => {
    filterActivities();
  }, [showHabits, showTasks, activities]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Actualizar evento</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
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
              {filteredActivities.map(act => (
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

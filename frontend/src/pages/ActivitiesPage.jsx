import React, { useState, useEffect, useRef } from 'react';
import {Container,Grid} from '@mui/material';
import { getActivities, createActivity, updateActivity, deleteActivity} from '../services/activity.service';
import ActivityList from '../components/ActivityList/ActivityList';


function ActivitiesPage() {
    // Estados
    const [activities, setActivities] = useState([]);
    const [currentType, setCurrentType] = useState(1);
    const [isAddingActivity, setIsAddingActivity] = useState(false);
    const [newActivityName, setNewActivityName] = useState('');
    const [error, setError] = useState(''); // Estado para manejar el mensaje de error
    const [editingActivityId, setEditingActivityId] = useState(null); // Estado para manejar el ID de la actividad que se está editando
    const [updatedActivityName, setUpdatedActivityName] = useState(''); // Estado para manejar el nuevo nombre de la actividad en edición
    // Referencias para los campos de entrada creación o edición de actividad
    const newActivityInputRef = useRef(null);
    const editingActivityInputRef = useRef(null);
    // Cargar actividades
    useEffect(() => {
        const fetchActivities = async () => {
            const activitiesData = await getActivities();
            // Ordenar las actividades por la fecha de creación (created_at) de más recientes a antiguas
            const sortedActivities = activitiesData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setActivities(sortedActivities);
        };
        fetchActivities();
    }, []);

    // Efecto para enfocar automáticamente el campo de entrada adecuado
    useEffect(() => {
        if (isAddingActivity) {
            newActivityInputRef.current.focus();
        } else if (editingActivityId !== null) {
            editingActivityInputRef.current.focus();
        }
    }, [isAddingActivity, editingActivityId]);

    // Manejador global de clic para cancelar la adición o edición de actividades
    useEffect(() => {
        const handleGlobalClick = (event) => {

            // Si no se está añadiendo o editando una actividad, no hacemos nada
            if (!isAddingActivity && !editingActivityId) return;

            // Obtener el elemento que disparó el evento
            const clickedElement = event.target;

            // Si se está añadiendo una actividad y el clic ocurrió fuera del campo de entrada, cancelar la adición
            if (isAddingActivity && !clickedElement.closest('.adding-activity-item')) {
                handleCancelAddActivity();
            }

            // Si se está editando una actividad y el clic ocurrió fuera del campo de entrada, cancelar la edición
            if (editingActivityId && !clickedElement.closest(`.editing-activity-item-${editingActivityId}`)) {
                
                if (!clickedElement.closest('.MuiInputBase-input')) {
                    setEditingActivityId(null);
                }
            }
        };

        // Agregar el evento de clic global
        document.addEventListener('click', handleGlobalClick);

        // Limpiar el evento de clic global cuando el componente se desmonte
        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, [isAddingActivity, editingActivityId]);


    // Función para manejar el cambio de tipo de actividad en columna 1
    const handleTypeChange = (direction) => {
        setCurrentType((prevType) => (direction === 'previous' ? (prevType === 1 ? 2 : prevType - 1) : (prevType === 2 ? 1 : prevType + 1)));
    };

    // Función para manejar el cambio del nombre de la nueva actividad
    const handleNewActivityNameChange = (event) => {
        setNewActivityName(event.target.value);
    };

    // Función para comenzar a agregar una nueva actividad
    const handleStartAddActivity = () => {
        setIsAddingActivity(true);

    };

    // Función para agregar una nueva actividad
    const handleAddActivity = async () => {
        if (newActivityName.trim() === '') {
            setError('Por favor, complete el nombre de la actividad.');
            return;
        }

        setError(''); // Limpia el mensaje de error si no hay errores

        const newActivity = {
            name: newActivityName,
            activity_type: currentType,
        };

        const addedActivity = await createActivity(newActivity);

        // Agrega la nueva actividad a la lista de actividades
        const updatedActivities = [...activities, addedActivity];
    
        // Ordena la lista de actividades por created_at de más recientes a antiguas
        const sortedActivities = updatedActivities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
        // setActivities([...activities, addedActivity]);

        setActivities(sortedActivities);

        setNewActivityName('');
        setIsAddingActivity(false);
    };

    // Función para manejar la edición de una actividad
    const handleEditActivity = (activity) => {
        // Establece el ID de la actividad que se está editando
        setEditingActivityId(activity.id);
        // Establece el nombre actual de la actividad para que se pueda editar
        setUpdatedActivityName(activity.name);
         // Verifica si la actividad que se está editando es de tipo hábito o tarea y establece el tipo actual en consecuencia
        setCurrentType(activity.activity_type);


    };

    // Función para guardar la actividad actualizada
    const handleSaveUpdatedActivity = async (activityId) => {
        // Llama a la función updateActivity para guardar los cambios en la base de datos
        const updatedActivity = {
            id: activityId,
            name: updatedActivityName,
            activity_type: currentType
        };

        try {
            const savedActivity = await updateActivity(activityId, updatedActivity);
            // Si se guarda correctamente, actualiza la lista de actividades
            const updatedActivities = activities.map(activity => {
                if (activity.id === activityId) {
                    return savedActivity;
                }
                return activity;
            });
            setActivities(updatedActivities);
        } catch (error) {
            setError('Hubo un problema al actualizar la actividad.');
        }

        setEditingActivityId(null);
    };

    // Función para manejar el cambio de nombre de la actividad actualizada
    const handleUpdatedActivityNameChange = (event) => {
        setUpdatedActivityName(event.target.value);
    };

    // Función para cancelar la adición de una nueva actividad
    const handleCancelAddActivity = () => {
        setNewActivityName('');
        setIsAddingActivity(false);
        setError(''); // Limpia el mensaje de error cuando se cancela agregar actividad
    };


    const handleDeleteActivity = async (activityId) => {
    try {
        // Llama a la función deleteActivity para eliminar la actividad
        const success = await deleteActivity(activityId);
        if (success) {
            // Si se elimina correctamente, actualiza la lista de actividades
            const updatedActivities = activities.filter(activity => activity.id !== activityId);
            setActivities(updatedActivities);
        }
    } catch (error) {
        setError(`Hubo un problema al eliminar la actividad con ID ${activityId}.`);
    }
    };

    // Variables para diferenciar entre actividades tipo hábito y tipo tarea
    const filteredActivities = activities.filter(activity => activity.activity_type === currentType);

    return (
        
        <Container maxWidth={false}>

            <Grid container sx={{ paddingTop: '0.5vh' }}>
               
                    <>
                        {/* División una columna */}
                            <ActivityList
                            filteredActivities={filteredActivities}
                            handleTypeChange={handleTypeChange}
                            currentType={currentType}
                            isAddingActivity={isAddingActivity}
                            newActivityName={newActivityName}
                            handleNewActivityNameChange={handleNewActivityNameChange}
                            handleAddActivity={handleAddActivity}
                            error={error}
                            editingActivityId={editingActivityId}
                            updatedActivityName={updatedActivityName}
                            handleUpdatedActivityNameChange={handleUpdatedActivityNameChange}
                            handleSaveUpdatedActivity={handleSaveUpdatedActivity}
                            handleEditActivity={handleEditActivity}
                            handleDeleteActivity={handleDeleteActivity}
                            handleStartAddActivity={handleStartAddActivity}
                            newActivityInputRef={newActivityInputRef}
                            editingActivityInputRef={editingActivityInputRef}
                            />
                    </>
            </Grid>
                </Container>
        );
}
export default ActivitiesPage;

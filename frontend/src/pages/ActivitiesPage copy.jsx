import React, { useState, useEffect, useRef } from 'react';
import {Container,Grid,Typography,Card,CardContent,Switch,FormControlLabel,IconButton,Button,TextField} from '@mui/material';
import { ArrowLeft, ArrowRight, Check, Delete } from '@mui/icons-material';
import { getActivities, createActivity, updateActivity, deleteActivity} from '../services/activity.service';

function ActivitiesPage() {
    // Estados
    const [activities, setActivities] = useState([]);
    const [isTwoColumns, setIsTwoColumns] = useState(false);
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


    // Función para manejar el cambio de tipo de actividad
    const handleTypeChange = (direction) => {
        setCurrentType((prevType) => (direction === 'previous' ? (prevType === 1 ? 2 : prevType - 1) : (prevType === 2 ? 1 : prevType + 1)));
    };

    // Función para manejar el cambio de columna
    const handleToggle = (event) => {
        setIsTwoColumns(event.target.checked);
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
    const habits = activities.filter(activity => activity.activity_type === 1);
    const tasks = activities.filter(activity => activity.activity_type === 2);

    return (
        
        <Container maxWidth={false} sx={{ padding: 0, height: '80vh' }}>

            {/* Controlador columnas */}
            <FormControlLabel
                sx={{ display: 'flex', justifyContent: 'flex-end'}}
                control={
                    <Switch
                        checked={isTwoColumns}
                        onChange={handleToggle}
                        size='small'
                        name="toggleColumns"
                        color="secondary"
                    />
                }
                label={'Columnas'}
            />

            <Grid container spacing={3} sx={{ paddingTop: '1vh' }}>
                {!isTwoColumns ? (
                    <>
                        {/* División una columna */}
                        <Grid item xs={12}>




                            {/* Título Listas */}
                            <Grid container justifyContent="space-evenly" alignItems="center">
                                <IconButton onClick={() => handleTypeChange('previous')}>
                                    <ArrowLeft />
                                </IconButton>

                                <Typography variant="h4">
                                    {currentType === 1 ? 'Hábito' : 'Tarea'}
                                </Typography>

                                <IconButton onClick={() => handleTypeChange('next')}>
                                    <ArrowRight />
                                </IconButton>
                            </Grid>

                            {/* Sección para crear nuevas actividades */}
                            <Grid container sx={{ marginTop: '1vh', display: 'flex', justifyContent: 'center' }}>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        size='small'
                                        color="warning"
                                        setCurrentType={currentType}
                                        onClick={handleStartAddActivity}
                                        
                                    >
                                        Añadir
                                    </Button>
                                </Grid>

                                {isAddingActivity && (
                                    <>
                                       
                                        <Card className="adding-activity-item">
                                            
                                        <CardContent>
                                            <TextField
                                                label="Nombre de la actividad"
                                                value={newActivityName}
                                                onChange={handleNewActivityNameChange}
                                                inputRef={newActivityInputRef}
                                                fullWidth
                                                onKeyUp={(event) => {
                                                    if (event.key === 'Enter') {
                                                        handleAddActivity();
                                                    }
                                                }}
                                            

                                            />

                                            <IconButton
                                                color="primary"
                                                onClick={handleAddActivity}
                                            >
                                                <Check />
                                            </IconButton>
                                            
                                        </CardContent>


                                            </Card>
                                       

                                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error en rojo */}
                                    </>
                                )}
                            </Grid>

                            <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '50vh', overflowY: 'auto' }}>
                                {filteredActivities.map(activity => (
                                    <li key={activity.id} style={{ marginBottom: '15px' }}>
                                        <Card >
                                            <CardContent>
                                                {/* Si la actividad está siendo editada, muestra un campo de texto para editar */}
                                                {editingActivityId === activity.id ? (
                                                    <>
                                                        <TextField
                                                            className={`activity-item-${activity.id}`}
                                                            value={updatedActivityName}
                                                            onChange={handleUpdatedActivityNameChange}
                                                            inputRef={editingActivityInputRef}
                                                            onKeyUp={(event) => {
                                                                if (event.key === 'Enter') {
                                                                    handleSaveUpdatedActivity(activity.id);
                                                                }
                                                            }}
                                                            fullWidth
                                                        />
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => handleSaveUpdatedActivity(activity.id)}
                                                        >
                                                            <Check />
                                                        </IconButton>
                                                   
                                                    </>
                                                ) : (
                                                        // De lo contrario, muestra el nombre de la actividad como texto normal
                                                        <Typography sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}
                                    
                                                        >
                                                            <Grid xs={12}>
                                                            <p onClick={() => handleEditActivity(activity)} sx={{maxWidth:'fit-content'}}>
                                                                {activity.name}
                                                                
                                                            </p>
                                                            </Grid>
                                                            <Grid xs={0}>
                                                                    

                                                                <IconButton
                                                                    onClick={() => handleDeleteActivity(activity.id)}
                                                                    size="small"
                                                                >
                                                                <Delete />
                                                                </IconButton>
                                                            </Grid>
                                                            
                                                            </Typography>
                                                            
                                                       
                                                )}
                                            </CardContent>
                                        </Card>
                                    </li>
                                ))}
                            </ul>



                            

                        </Grid>
                    </>
                ) : (
                        <>
                            {/* División dos columnas */}
                        
                        {/* Columna hábitos */}
                            
                        <Grid item xs={6}>
                                

                            <Typography variant="h6">Hábito</Typography>

                            <Grid container sx={{ marginTop: '1vh', display: 'flex', justifyContent: 'flex-start' }}>
                                
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        size='small'
                                        color="warning"
                                            
                                            onClick={() => {
                                            setCurrentType(1)
                                            handleStartAddActivity();  // Inicia la adición de una nueva actividad
                                        }}
                                    >
                                        Añadir
                                    </Button>
                                    </Grid>
                                    
                                {isAddingActivity && currentType === 1 && (
                                    <>
                                        <Card className="adding-activity-item" style={{ display: 'flex', alignItems: 'center' }}>
                                            <CardContent>
                                        
                                            <TextField
                                                label="Nombre de la actividad"
                                                value={newActivityName}
                                                onChange={handleNewActivityNameChange}
                                                inputRef={newActivityInputRef}
                                                fullWidth
                                                onKeyUp={(event) => {
                                                    if (event.key === 'Enter') {
                                                        handleAddActivity();
                                                    }
                                                }}
                                            

                                            />

                                            <IconButton
                                                color="primary"
                                                onClick={handleAddActivity}
                                            >
                                                <Check />
                                                    </IconButton>
                                                    
                                            </CardContent>
                                        </Card>

                                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error en rojo */}
                                    </>
                                )}

                                
                                
                            </Grid>

                            <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
                                {habits.map(activity => (
                                    <li key={activity.id} style={{ marginBottom: '15px' }}>
                                        <Card>
                                            <CardContent>
                                                 {/* Si la actividad está siendo editada, muestra un campo de texto para editar */}
                                                {editingActivityId === activity.id ? (
                                                    <>
                                                        <TextField
                                                            value={updatedActivityName}
                                                            onChange={handleUpdatedActivityNameChange}
                                                            inputRef={editingActivityInputRef}
                                                            onKeyUp={(event) => {
                                                                if (event.key === 'Enter') {
                                                                    handleSaveUpdatedActivity(activity.id);
                                                                }
                                                            }}
                                                            fullWidth
                                                        />
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => handleSaveUpdatedActivity(activity.id)}
                                                        >
                                                            <Check />
                                                        </IconButton>
                                            

                                                    </>
                                                ) : (
                                                    // De lo contrario, muestra el nombre de la actividad como texto normal
                                                        <Typography sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}
                                    
                                                        >
                                                            <Grid xs={12}>
                                                            <p onClick={() => handleEditActivity(activity)} sx={{maxWidth:'fit-content'}}>
                                                                {activity.name}
                                                                
                                                            </p>
                                                            </Grid>
                                                            <Grid xs={0}>
                                                                    

                                                                <IconButton
                                                                    onClick={() => handleDeleteActivity(activity.id)}
                                                                    size="small"
                                                                >
                                                                <Delete />
                                                                </IconButton>
                                                            </Grid>
                                                            
                                                    </Typography>
                                                )}

                                            </CardContent>
                                        </Card>
                                    </li>
                                ))}
                                </ul>

                        </Grid>
                        
                            {/* Columna tareas */}
                            
                            <Grid item xs={6}>
                                

                            <Typography variant="h6">Tarea</Typography>

                            <Grid container sx={{ marginTop: '1vh', display: 'flex', justifyContent: 'center' }}>
                                
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        size='small'
                                        color="warning"
                                            
                                        onClick={() => {
                                            setCurrentType(2)
                                            handleStartAddActivity();  // Inicia la adición de una nueva actividad
                                        }}
                                    >
                                        Añadir
                                    </Button>
                                    </Grid>
                                    
                                {isAddingActivity && currentType === 2 && (
                                    <>
                                            <Card className="adding-activity-item" style={{ display: 'flex', alignItems: 'center' }}>
                                                <CardContent>
                                            <TextField
                                                label="Nombre de la actividad"
                                                value={newActivityName}
                                                onChange={handleNewActivityNameChange}
                                                inputRef={newActivityInputRef}
                                                fullWidth
                                                onKeyUp={(event) => {
                                                    if (event.key === 'Enter') {
                                                        handleAddActivity();
                                                    }
                                                }}
                                            

                                            />

                                            <IconButton
                                                color="primary"
                                                onClick={handleAddActivity}
                                            >
                                                <Check />
                                            </IconButton>
                                            </CardContent>
                                        </Card>

                                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error en rojo */}
                                    </>
                                )}

                                
                                
                            </Grid>

                            <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
                                {tasks.map(activity => (
                                    <li key={activity.id} style={{ marginBottom: '15px' }}>
                                        <Card>
                                            <CardContent>
                                                 {/* Si la actividad está siendo editada, muestra un campo de texto para editar */}
                                                {editingActivityId === activity.id ? (
                                                    <>
                                                        <TextField
                                                            value={updatedActivityName}
                                                            onChange={handleUpdatedActivityNameChange}
                                                            inputRef={editingActivityInputRef}
                                                            onKeyUp={(event) => {
                                                                if (event.key === 'Enter') {
                                                                    handleSaveUpdatedActivity(activity.id);
                                                                }
                                                            }}
                                                            fullWidth
                                                        />
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => handleSaveUpdatedActivity(activity.id)}
                                                        >
                                                            <Check />
                                                        </IconButton>



                                                    </>
                                                ) : (
                                                    // De lo contrario, muestra el nombre de la actividad como texto normal
                                                        <Typography sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}
                                    
                                                        >
                                                            <Grid xs={12}>
                                                            <p onClick={() => handleEditActivity(activity)} sx={{maxWidth:'fit-content'}}>
                                                                {activity.name}
                                                                
                                                            </p>
                                                            </Grid>
                                                            <Grid xs={0}>
                                                                    

                                                                <IconButton
                                                                    onClick={() => handleDeleteActivity(activity.id)}
                                                                    size="small"
                                                                >
                                                                <Delete />
                                                                </IconButton>
                                                            </Grid>
                                                            
                                                    </Typography>
                                                )}

                                            </CardContent>
                                        </Card>
                                    </li>
                                ))}
                                </ul>



                            </Grid>

                        </>
                        
                )}

            </Grid>

        </Container>
    );
}

export default ActivitiesPage;

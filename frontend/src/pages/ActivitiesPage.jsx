import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Grid } from '@mui/material';
import { getActivities, createActivity, updateActivity, deleteActivity } from '../services/activity.service';
import ActivityList from '../components/ActivityList/ActivityList';

function ActivitiesPage() {
    // Estados
    const [activities, setActivities] = useState([]);
    const [currentType, setCurrentType] = useState(1);
    const [isAddingActivity, setIsAddingActivity] = useState(false);

    const [newActivityName, setNewActivityName] = useState('');
    const [errors, setErrors] = useState('');

    const [editingActivityId, setEditingActivityId] = useState(null); 
    const [updatedActivityName, setUpdatedActivityName] = useState(''); 
    const [showMenu, setShowMenu] = useState(false); 
    
    const newActivityInputRef = useRef(null);
    const editingActivityInputRef = useRef(null);

    useEffect(() => {
        const fetchActivities = async () => {
            const activitiesData = await getActivities();
            const sortedActivities = activitiesData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setActivities(sortedActivities);
        };
        fetchActivities();
    }, []);

    useEffect(() => {
        if (isAddingActivity) {
            newActivityInputRef.current.focus();
        } else if (editingActivityId !== null) {
            editingActivityInputRef.current.focus();
        }
    }, [isAddingActivity, editingActivityId]);

    const handleCancelAddActivity = useCallback(() => {
        setNewActivityName('');
        setIsAddingActivity(false);
        setErrors(''); 
    }, []);

    const handleCancelUpdateActivity = useCallback(() => {
        setUpdatedActivityName('');
        setEditingActivityId(null);
        setErrors(''); 
    }, []);

    useEffect(() => {
        const handleGlobalClick = (event) => {
            if (!isAddingActivity && !editingActivityId) return;

            const clickedElement = event.target;

            if (isAddingActivity && !clickedElement.closest('.adding-activity-item')) {
                handleCancelAddActivity();
            }

            if (editingActivityId && !clickedElement.closest(`.editing-activity-item-${editingActivityId}`)) {
                
                handleCancelUpdateActivity();
                
            }
        };

        document.addEventListener('click', handleGlobalClick);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, [isAddingActivity, editingActivityId, handleCancelAddActivity, handleCancelUpdateActivity, errors]);

    const handleTypeChange = (direction) => {
        setCurrentType((prevType) => (direction === 'previous' ? (prevType === 1 ? 2 : prevType - 1) : (prevType === 2 ? 1 : prevType + 1)));
    };

    const handleNewActivityNameChange = (event) => {
        setNewActivityName(event.target.value);
    };

    const handleStartAddActivity = () => {
        setIsAddingActivity(true);
    };

    const handleAddActivity = async () => {
        try {
            const newActivity = {
                name: newActivityName,
                activity_type: currentType,
            };

            const addedActivity = await createActivity(newActivity);
            const updatedActivities = [...activities, addedActivity];
            const sortedActivities = updatedActivities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setActivities(sortedActivities);

            setNewActivityName('');
            setIsAddingActivity(false);
        } catch (e) {
            if (e.validationErrors) {
                setErrors(e.validationErrors);
            } else if (e.validationServerErrors) {
                setErrors(e.validationServerErrors);
            } else {
                setErrors(e.serverErrors);
            }
        }
    };

    const handleEditActivity = (activity) => {
        setEditingActivityId(activity.id);
        setUpdatedActivityName(activity.name);
        setCurrentType(activity.activity_type);
    };

    const handleSaveUpdatedActivity = async (activityId) => {
        try {
            const updatedActivity = {
                id: activityId,
                name: updatedActivityName,
                activity_type: currentType
            };

            const savedActivity = await updateActivity(activityId, updatedActivity);
            const updatedActivities = activities.map(activity => (activity.id === activityId ? savedActivity : activity));
            setActivities(updatedActivities);

            setEditingActivityId(null);
            setErrors('');
        } catch (e) {
            if (e.validationErrors) {
                setErrors(e.validationErrors);
            } else if (e.validationServerErrors) {
                setErrors(e.validationServerErrors);
            } else {
                setErrors(e.serverErrors);
            }
        }
    };

    const handleUpdatedActivityNameChange = (event) => {
        setUpdatedActivityName(event.target.value);
    };

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleDeleteActivity = async (activityId) => {
        try {
            const success = await deleteActivity(activityId);
            if (success) {
                const updatedActivities = activities.filter(activity => activity.id !== activityId);
                setActivities(updatedActivities);
            }
        } catch (error) {
            setErrors(`Hubo un problema al eliminar la actividad con ID ${activityId}.`);
        }
    };

    const filteredActivities = activities.filter(activity => activity.activity_type === currentType);

    return (
        <Container maxWidth="md">
            <Grid container sx={{ paddingTop: '0.5vh' }}>
                <ActivityList
                    filteredActivities={filteredActivities}
                    handleTypeChange={handleTypeChange}
                    currentType={currentType}
                    isAddingActivity={isAddingActivity}
                    newActivityName={newActivityName}
                    handleNewActivityNameChange={handleNewActivityNameChange}
                    handleAddActivity={handleAddActivity}
                    errors={errors}
                    editingActivityId={editingActivityId}
                    updatedActivityName={updatedActivityName}
                    handleUpdatedActivityNameChange={handleUpdatedActivityNameChange}
                    handleSaveUpdatedActivity={handleSaveUpdatedActivity}
                    handleEditActivity={handleEditActivity}
                    handleDeleteActivity={handleDeleteActivity}
                    handleShowMenu={handleShowMenu}
                    showMenu={showMenu}
                    handleStartAddActivity={handleStartAddActivity}
                    newActivityInputRef={newActivityInputRef}
                    editingActivityInputRef={editingActivityInputRef}
                />
            </Grid>
        </Container>
    );
}

export default ActivitiesPage;

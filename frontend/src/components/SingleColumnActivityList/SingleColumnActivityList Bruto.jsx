import React from 'react';
import { Grid, IconButton, Typography, Button, Card, CardContent, TextField } from '@mui/material';
import { ArrowLeft, ArrowRight, Check, Delete } from '@mui/icons-material';

const SingleColumnActivityList = ({ filteredActivities, handleTypeChange, currentType, isAddingActivity, newActivityName, handleNewActivityNameChange, handleAddActivity, error, editingActivityId, updatedActivityName, handleUpdatedActivityNameChange, handleSaveUpdatedActivity, handleEditActivity, handleDeleteActivity, handleStartAddActivity, newActivityInputRef, editingActivityInputRef}) => {

    return (
        <>
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
                        onClick={handleStartAddActivity}
                    >
                        Añadir
                    </Button>
                </Grid>

                {isAddingActivity && (
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
                )}

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Grid>
            
            <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '50vh', overflowY: 'auto' }}>
                {filteredActivities.map(activity => (
                    <li key={activity.id} style={{ marginBottom: '15px' }}>
                        <Card>
                            <CardContent>
                                {editingActivityId === activity.id ? (
                                    <>
                                        <TextField
                                            value={updatedActivityName}
                                            onChange={handleUpdatedActivityNameChange}
                                            inputRef={editingActivityInputRef}
                                            fullWidth
                                            onKeyUp={(event) => {
                                                if (event.key === 'Enter') {
                                                    handleSaveUpdatedActivity(activity.id);
                                                }
                                            }}
                                        />
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleSaveUpdatedActivity(activity.id)}
                                        >
                                            <Check />
                                        </IconButton>
                                    </>
                                ) : (
                                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p onClick={() => handleEditActivity(activity)} sx={{ maxWidth: 'fit-content' }}>
                                            {activity.name}
                                        </p>
                                        <IconButton
                                            onClick={() => handleDeleteActivity(activity.id)}
                                            size="small"
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </li>

                ))}
                    </ul>
                    
                </Grid>
                
        </>
    );
};

export default SingleColumnActivityList;

import React from 'react';
import { Grid, IconButton, Typography, Button, Card, CardContent, TextField } from '@mui/material';
import { Check, Delete } from '@mui/icons-material';

const TwoColumnActivityList = ({ habits, tasks, isAddingActivity, newActivityName, handleNewActivityNameChange, handleAddActivity, error, editingActivityId,
updatedActivityName, handleUpdatedActivityNameChange, handleSaveUpdatedActivity,handleEditActivity,handleDeleteActivity,handleStartAddActivity,newActivityInputRef,
editingActivityInputRef, currentType, setCurrentType
}) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: '1vh' }}>
      {/* Columna de hábitos */}
      <Grid item xs={6}>
        <Typography variant="h6">Hábito</Typography>

        {/* Botón de añadir actividad en columna hábitos */}
        <Button
          variant="contained"
          size="small"
          color="warning"
          onClick={() => {
            setCurrentType(1);
            handleStartAddActivity();
          }}
        >
          Añadir
        </Button>

        {/* Campo de entrada para añadir actividad en columna hábitos */}
        {isAddingActivity && currentType === 1 && (
          <Card className="adding-activity-item" style={{ marginTop: '1vh' }}>
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
              <IconButton color="primary" onClick={handleAddActivity}>
                <Check />
              </IconButton>
            </CardContent>
          </Card>
        )}

        {/* Mensaje de error */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Lista de hábitos */}
        <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
          {habits.map((activity) => (
            <li key={activity.id} style={{ marginBottom: '15px' }}>
              <Card>
                <CardContent>
                  {/* Modo de edición */}
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
                      <IconButton color="primary" onClick={() => handleSaveUpdatedActivity(activity.id)}>
                        <Check />
                      </IconButton>
                    </>
                  ) : (
                    // Modo de visualización normal
                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p onClick={() => handleEditActivity(activity)} sx={{ maxWidth: 'fit-content' }}>
                        {activity.name}
                      </p>
                      <IconButton onClick={() => handleDeleteActivity(activity.id)} size="small">
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
          


      {/* Columna de tareas */}
      <Grid item xs={6}>
        <Typography variant="h6">Tarea</Typography>

        {/* Botón de añadir actividad */}
        <Button
          variant="contained"
          size="small"
          color="warning"
          onClick={() => {
            setCurrentType(2);
            handleStartAddActivity();
          }}
        >
          Añadir
        </Button>

        {/* Campo de entrada para añadir actividad */}
        {isAddingActivity && currentType === 2 && (
          <Card className="adding-activity-item" style={{ marginTop: '1vh' }}>
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
              <IconButton color="primary" onClick={handleAddActivity}>
                <Check />
              </IconButton>
            </CardContent>
          </Card>
        )}

        {/* Mensaje de error */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Lista de tareas */}
        <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
          {tasks.map((activity) => (
            <li key={activity.id} style={{ marginBottom: '15px' }}>
              <Card>
                <CardContent>
                  {/* Modo de edición */}
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
                      <IconButton color="primary" onClick={() => handleSaveUpdatedActivity(activity.id)}>
                        <Check />
                      </IconButton>
                    </>
                  ) : (
                    // Modo de visualización normal
                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p onClick={() => handleEditActivity(activity)} sx={{ maxWidth: 'fit-content' }}>
                        {activity.name}
                      </p>
                      <IconButton onClick={() => handleDeleteActivity(activity.id)} size="small">
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
    </Grid>
  );
};

export default TwoColumnActivityList;

import React from 'react';
import { Paper, Typography, List } from '@mui/material';
import EventListItem from './EventListItem';

const EventListToday = ({ eventsToday, eventsCompleted, onToggleCompleted, onToggleEventDay, showNext }) => {
  return (
    <Paper variant="outlined" sx={{ background: 'transparent', border: 'transparent' }}>
      <Typography variant="h5">Hoy</Typography>
      <List>
        {eventsToday.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            onToggleCompleted={onToggleCompleted}
            onToggleEventDay={onToggleEventDay}
            showNext={showNext}
            
          />
        ))}
      </List>
      
      {eventsCompleted.length > 0 && (
        <>
          <Typography variant="h5">Finalizados</Typography>
          <List>
            {eventsCompleted.map(event => (
              <EventListItem
                key={event.id}
                event={event}
                onToggleCompleted={onToggleCompleted}
                onToggleEventDay={onToggleEventDay}
                showNext={showNext}
                completed
              />
            ))}
          </List>
        </>
      )}
    </Paper>
  );
};

export default EventListToday;

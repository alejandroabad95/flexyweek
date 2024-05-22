import React from 'react';
import { Paper, Typography, List } from '@mui/material';
import EventListItem from './EventListItem';

const EventListFuture = ({ eventsNext, onToggleCompleted, onToggleEventDay }) => {
  return (
    <Paper variant="outlined" sx={{ background: 'transparent', border: 'transparent' }}>
      <Typography variant="h5">Próximos</Typography>
      <List>
        {eventsNext.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            onToggleCompleted={onToggleCompleted}
            onToggleEventDay={onToggleEventDay}
          />
        ))}
      </List>
    </Paper>
  );
};

export default EventListFuture;

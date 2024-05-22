import React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

const EventListItem = ({ event, onToggleCompleted, onToggleEventDay, showNext, completed }) => {
  const handleToggleCompleted = () => {
    onToggleCompleted(event.id);
  };

  const handleToggleEventDay = () => {
    onToggleEventDay(event.id, 'next');
  };

  return (
    <ListItem key={event.id}>
      <ListItemButton onClick={handleToggleCompleted}>
        {completed ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedTwoToneIcon />}
      </ListItemButton>
      <ListItemText
        primary={event.activity_name}
        secondary={!showNext && !completed && (
          <>
            <span>
              {event.goal}
              <HelpOutlineTwoToneIcon />
            </span>
          </>
        )}
      />
      {!showNext && !completed && (
        <ListItemButton onClick={handleToggleEventDay}>
          <KeyboardDoubleArrowRightRoundedIcon />
        </ListItemButton>
      )}
    </ListItem>
  );
};

export default EventListItem;

import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';

const ErrorMessage = ({ message }) => {

  const theme = useTheme();

  return (
    <Typography variant='h6' color='error' align='center' sx={{ margin: theme.spacing(2) }}>
      {message}
    </Typography>
  );
};

export default ErrorMessage;

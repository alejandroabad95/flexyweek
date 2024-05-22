// import React from 'react';
// import './Footer.css'

// function Footer() {
//   return (
    
//     <footer className='footer'>
//       <p className='footer-text'>© 2024 Flexyweek. Todos los derechos reservados.</p>
//     </footer>
//   );
// }

// export default Footer;

import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
        height: '20px', // Mantiene la misma altura que en el CSS original
      }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'white', 
          margin: 0,
          fontSize: '14px',
        }}
      >
        © 2024 Flexyweek. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}

export default Footer;

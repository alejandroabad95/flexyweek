import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B0082', // Azul púrpura profundo
      contrastText: '#fff', // Texto blanco para buen contraste sobre azul
    },
    secondary: {
      main: '#F4D03F',  // Un rosa fuerte
    },
    error: {
      main: '#f44336',  // Rojo para errores, color estándar de error en Material-UI
    },
    text: {
      primary: '#2e2e2e', // Un gris oscuro para texto principal
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,  // Tamaño de fuente base
    body1: {
      fontSize: '0.7rem'
    },
    body2: {
      fontSize: '0.55rem', // Reducir el tamaño de fuente de body2
    },
  },
  components: {

    // Componentes Actividades y Horario
    MuiListItem: {
      styleOverrides: {
        root: {
          
        },
      },
    },

    // Componentes Planner
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '0', // Establecer padding a cero para TableCell
          textAlign: 'center', // Establece encabezado centrado
        },
      },
    },




  },
});

export default theme;

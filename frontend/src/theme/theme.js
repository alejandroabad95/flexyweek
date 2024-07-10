import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B0082', // Índigo entre azul y violeta: color primario para enviar formulario, aceptar
      contrastText: '#fff', // Texto blanco para buen contraste sobre azul
    },
    secondary: {
      // main: '#A3CCE7',
      main: '#F5F5F5', // Transparente
    },

    background: {
      default: '#FFF', // Fondo general de la aplicación

      // Paper hábitos
      paperHabit: '#F5F5F5', 
      // paperHabitCompleted: '#00824B',  // Fondo tarjeta hábitos completados igual que succesmain
      paperHabitCompleted: '#02C371',  // Fondo tarjeta hábitos completados igual que succesmain

      // Paper tareas
      paperTask: '#F5F5F5',           // Fondo tarjeta tareas
      // paperTaskCompleted: '#FFF5C3',  // Fondo tarjeta tareas completadas
      paperTaskCompleted: '#FF9800',  // Fondo tarjeta tareas completadas
     
    },

    success: {
      main: '#00824B',  // Verde bosque: para botón de crear y marcar como completado o descompletado
    },

    icon: {
      gear: 'gray'
    },

    info: {
      main: '#788200', //        , color para obtener más información
    },

    warning: {
      main: '#007882', //  Verde azulado, color para la edición de actividades y eventos
    },

    danger: {
      main: '#820A00', // Rojo vino, color para cancelación y eliminación de actividades y eventos
    },

    error: {
      main: '#f44336',  // Rojo para errores, color estándar de error en Material-UI
    },
   
    text: {
      primary: '#2e2e2e', // Un gris oscuro para texto principal
    },
  },

  borders: {

    borderRadiusHabit: '16px', // Radio de las esquinas
    borderHabit: `1px ridge #00824B`, // Grosor y estilo del borde

    borderRadiusTask: '0px',
    borderTask: '1px ridge #820A00',

  },


  typography: {
    fontFamily: ' "Verdan",sans-serif ',
    fontSize: 16,  // Tamaño de fuente base
    body1: {
      fontSize: '0.7rem'
    },
    body2: {
      fontSize: '0.55rem', // Reducir el tamaño de fuente de body2
    },
    // Títulos
     h1: {
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.9rem',
       },
      fontWeight: '600',
    },
    // Tamaño letra actividad grande
    h2: {
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
      fontWeight:'800'
    },
    h3: {
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    h5: {
      fontSize: '1.25rem',
      '@media (max-width:600px)': {
        fontSize: '0.875rem',
      },
    },
    h6: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.75rem',
      }
    
    },

  },


  components: {

    // Componentes Actividades y Horario
    MuiList: {
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

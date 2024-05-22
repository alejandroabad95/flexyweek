import React from 'react';
import { Box, Typography } from '@mui/material';

const AdBanner = () => {
    return (
        <Box sx={{
            position: 'fixed',
            bottom: 20,  // Asegúrate de que esté justo encima del borde inferior
            left: 0,     // Comienza desde el borde izquierdo de la pantalla
            width: '100%', // Ocupa todo el ancho de la pantalla
            height: '5vh', // Altura fija
            display: 'flex', // Usa flexbox para centrar el contenido
            alignItems: 'center', // Centra verticalmente el contenido dentro del Box
            justifyContent: 'center', // Centra horizontalmente el contenido dentro del Box
            background: 'black', // Color de fondo
        }}>
            <Typography variant="h6" sx={{ color: 'white' }}>Anuncio</Typography>
        </Box>
    );
};

export default AdBanner;

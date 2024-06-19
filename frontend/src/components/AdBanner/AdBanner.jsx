import React, { useEffect } from 'react';
import { Box } from '@mui/material';


const AdBanner = () => {
    useEffect(() => {
        // Simulación de carga de script de Revcontent
        const script = document.createElement('script');
        script.textContent = `
            // Script simulado de Revcontent para prueba
            const ads = [
                { title: 'Anuncio 1', url: 'https://ejemplo.com/anuncio1' },
                { title: 'Anuncio 2', url: 'https://ejemplo.com/anuncio2' },
                { title: 'Anuncio 3', url: 'https://ejemplo.com/anuncio3' },
            ];
            ads.forEach(ad => {
                const adDiv = document.createElement('div');
                adDiv.textContent = ad.title;
                document.getElementById('revcontent-widget').appendChild(adDiv);
            });
        `;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 20,
            left: 0,
            width: '100%',
            height: '5vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'lightyellow',
            zIndex: 1000,
        }}>
            <div id="revcontent-widget"></div>
        </Box>
    );
};

export default AdBanner;

import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import Box from '@mui/material/Box';
// import AdBanner from './components/AdBanner/AdBanner';

function App() {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            <Navigation />
            <Box sx={{ marginTop: '80px',  width: '100%',  overflowY: 'hidden',  height: '80vh',  '@media (max-width: 599px)': {
                        marginTop: '65px'
                    }, }}>
                <AppRoutes />
            </Box>
            {/* <AdBanner /> */}

            <Footer />
        </Box>
    );
}

export default App;

import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';

import Box from '@mui/material/Box';
import AdBanner from './components/AdBanner/AdBanner';

function App() {

    return (
        <Box className="App">
            <Navigation/>
            <Box className="App-content">
                <AppRoutes />
            </Box>
            <AdBanner/>
            <Footer />
        </Box>
    );
}

export default App;

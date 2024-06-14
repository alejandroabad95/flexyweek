import React, { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

function NavigationMenu({ pages, routes, selectedPage, setSelectedPage, openNavMenu, setOpenNavMenu }) {
    // Manejar el cambio en el estado de openNavMenu con un efecto secundario
    useEffect(() => {
        if (!openNavMenu) {
            setSelectedPage(null); // Reiniciar la página seleccionada cuando se cierra la barra lateral
        }
    }, [openNavMenu, setSelectedPage]);

    const handleClick = (index) => {
        setSelectedPage(index); // Establecer la página seleccionada
        setOpenNavMenu(false); // Cerrar la barra lateral
    };

    const theme = useTheme();

    return (
        <Drawer
            variant="temporary"
            anchor="left"
            open={openNavMenu}
            onClose={() => setOpenNavMenu(false)} // Manejar el cierre de la barra lateral
            sx={{
                '&.MuiDrawer-root .MuiDrawer-paper': {
                    backgroundColor: theme.palette.background.default,
                    marginTop: { xs: '56px', sm: '64px' },
                    height: { 
                        xs: `calc(100vh - 56px - 21px)`, // Altura ajustada para móviles
                        md: `calc(100vh - 64px - 21px)` // Altura ajustada para pantallas medianas
                        }
                },
            }}
        >
            <List>
                
                {pages.map((page, index) => (
                    <ListItem
                        key={page}
                        
                        component={Link}
                        to={routes[index]}
                       
                        onClick={() => handleClick(index)} // Manejar el clic y cerrar la barra lateral
                    >
                        <ListItemText
                            primary={page}
                           
                        
                        />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default NavigationMenu;

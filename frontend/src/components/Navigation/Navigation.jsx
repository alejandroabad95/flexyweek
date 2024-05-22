// Navigation.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../contexts/auth.context';
import { useAuthService } from '../../services/auth.service';
import NavigationMenu from './NavigationMenu';


const pages = ['Actividades', 'Planificador', 'Horario'];
const routes = ['/activities', '/planner', '/schedule'];

function Navigation() {
    const [openNavMenu, setOpenNavMenu] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user } = useAuth();
    const { logout } = useAuthService();
    const [selectedPage, setSelectedPage] = React.useState(1); // Índice de 'Planificador'
   

    // Función para alternar la visibilidad del menú de navegación
    const handleToggleNavMenu = () => {
        setOpenNavMenu(!openNavMenu); // Cambia el estado de openNavMenu a su valor opuesto
    };

    
    // Función para abrir el menú de usuario
    const handleOpenUserMenu = (event) => {
        setAnchorEl(event.currentTarget); // Establece el elemento ancla para el menú de usuario como el elemento que desencadenó el evento (el botón de usuario)
    };

    // Función para cerrar el menú de usuario
    const handleCloseUserMenu = () => {
        setAnchorEl(null); // Restablece el elemento ancla del menú de usuario a null, lo que lo cierra
    };

    // Función para manejar el cierre de sesión del usuario
    const handleLogout = async () => {
        try {
            handleCloseUserMenu(); // Cierra el menú de usuario antes de proceder con el cierre de sesión
            await logout(); // Realiza la acción de cierre de sesión (puede ser una solicitud al servidor)
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Maneja cualquier error que ocurra durante el cierre de sesión, como mostrar un mensaje de error al usuario
        }
    };

    return (
        <>
            <AppBar position="fixed" color='primary' sx={{height: { xs: '56px', sm: '64px' }}}
             
            
            >
                <div style={{margin: '0 20px'}}>
                    <Toolbar disableGutters>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: user ? 'space-between' : 'center', width: '100%' }}>
                            {/* Icono de las tres rayitas */}
                            {user && (
                                <>
                                    <IconButton 
                                        size="large"
                                        aria-label="menu"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleToggleNavMenu}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </>
                            )}

                            {/* Texto "Flexyweek" centrado */}
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Flexyweek
                            </Typography>

                            {/* Icono de usuario */}
                            {user && (
                                <>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-user"
                                        aria-haspopup="true"
                                        onClick={handleOpenUserMenu}
                                        color="inherit"
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-user"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleCloseUserMenu}>Mi Perfil</MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>Cambiar Contraseña</MenuItem>
                                        <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                                    </Menu>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </div>
            </AppBar>

 
            <NavigationMenu
                pages={pages}
                routes={routes}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                openNavMenu={openNavMenu}
                setOpenNavMenu={setOpenNavMenu} // Asegúrate de pasar setOpenNavMenu como una prop
            />

        </>
    );
}

export default Navigation;

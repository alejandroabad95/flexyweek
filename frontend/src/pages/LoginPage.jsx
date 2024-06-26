import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthService } from '../services/auth.service';
import { useAuth } from '../contexts/auth.context';
import LoginForm from '../components/Forms/LoginForm';
import { Paper, Container, Grid, Typography, Box, Link as MuiLink } from '@mui/material';

function LoginPage() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuthService();
    const { user } = useAuth();
    const [paperElevation, setPaperElevation] = useState(1); 
    const formRef = useRef(null); // Referencia al formulario

    // Utiliza useEffect para redirigir automáticamente si el usuario ya está autenticado
    useEffect(() => {
        if (user) {
            navigate('/activities');
        }
    }, [user, navigate]);

    useEffect(() => {
        // Función para manejar el clic fuera del Paper
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                // Si el clic es fuera del Paper, restablece la elevación
                setPaperElevation(1);
            }
        };

        // Agregar event listener al documento para detectar clics
        document.addEventListener('click', handleClickOutside);

        // Limpiar el event listener al desmontar el componente
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        // Cambiar la elevación del Paper al hacer clic en el Paper mismo
        setPaperElevation(8); // Cambia el valor según lo que necesites
    };

    const handleLogin = async (credentials) => {
        try {
            await login(credentials.username, credentials.password);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '5vh' }}>
            <Grid container>
                <Grid item xs={12} onClick={handleClick} ref={formRef}>
                    <LoginForm onLogin={handleLogin} error={error} paperElevation={paperElevation} />

                    <Paper elevation={paperElevation}>
                        <Box p={3} mt={3}>
                            <Typography variant="body1" align="center">
                                ¿Todavía no estás registrado? <MuiLink component={Link} to="/signup">Regístrate aquí</MuiLink>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default LoginPage;

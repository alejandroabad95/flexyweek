import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthService } from '../services/auth.service';
import { useAuth } from '../contexts/auth.context';
import SignupForm from '../components/Forms/SignupForm';
import { Container, Grid, Typography, Link as MuiLink, Paper, Box } from '@mui/material';

function SignupPage() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signup } = useAuthService();
    const { user } = useAuth();
    const [paperElevation, setPaperElevation] = useState(1);
    const formRef = useRef(null); // Referencia al formulario


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




    const handleSignup = async (credentials) => {
        try {
            await signup(credentials.username, credentials.password, credentials.email);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '5vh' }}>
            <Grid container>
                <Grid item xs={12} ref={formRef} onClick={handleClick}>
                    <SignupForm onSignup={handleSignup} paperElevation={paperElevation} error={error} />

                    <Paper elevation={paperElevation} style={{ padding: '20px', marginTop: '20px' }} onClick={handleClick}>
                        <Typography variant="body1" align="center">
                            ¿Ya tienes cuenta? <MuiLink component={Link} to="/login">Inicia sesión aquí</MuiLink>
                        </Typography>

                        <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
                            Al registrarte, aceptas nuestra <MuiLink component={Link} to="/privacy-policy">política de privacidad</MuiLink>.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignupPage;

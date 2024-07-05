import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthService } from '../services/auth.service';
import { useAuth } from '../contexts/auth.context';
import SignupForm from '../components/Forms/SignupForm';
import { Container,Grid,Paper, Typography, Link as MuiLink } from '@mui/material';

function SignupPage() {
    const navigate = useNavigate();
    const { signup } = useAuthService();
    const { user } = useAuth();
    const [paperElevation, setPaperElevation] = useState(1);
    const formRef = useRef(null);
    const [errors, setErrors] = useState({ username: '', password: '', email: '', signupError: '' });

    useEffect(() => {
        if (user) {
            navigate('/activities');
        }
    }, [user, navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setPaperElevation(1);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        setPaperElevation(8);
    };

    const handleSignup = async (credentials) => {
        try {
            await signup(credentials.username, credentials.password, credentials.email);
            navigate('/activities');
        } catch (e) {
            if (e.validationErrors) {
                // Si hay errores de validación, actualizarlos en el estado
                setErrors(e.validationErrors);
            } else if (e.validationServerErrors) {
                // Validaciones del servidor concretas como el límite de usuarios
                setErrors(e.validationServerErrors);
            }
            else {
                setErrors(e.serverErrors);
            }
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '1vh' }}>
            <Grid container>
                <Grid item xs={12} ref={formRef} onClick={handleClick}>
                    <SignupForm onSignup={handleSignup} paperElevation={paperElevation} errors={errors} />

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

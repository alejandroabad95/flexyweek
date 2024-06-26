import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignupForm = ({ onSignup, paperElevation, error }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });
    const [validationError, setValidationError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value
        }));

        // Validar correo electrónico en tiempo real si es necesario
        if (id === 'email') {
            if (!value) {
                setValidationError('El correo electrónico es obligatorio');
            } else if (!validateEmail(value)) {
                setValidationError('El formato del correo electrónico no es válido');
            } else {
                setValidationError('');
            }
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar una vez más antes de enviar el formulario
        if (!credentials.email) {
            setValidationError('El correo electrónico es obligatorio');
            return;
        } else if (!validateEmail(credentials.email)) {
            setValidationError('El formato del correo electrónico no es válido');
            return;
        }

        // Limpiar mensaje de error de validación
        setValidationError('');

        // Llamar a la función de registro
        onSignup(credentials);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <Paper elevation={paperElevation} style={{ marginBottom: theme.spacing(4) }}>
            <Box p={3}>
                <Typography variant='h1' align='center' style={{ marginBottom: 20 }}>
                    Registrarse
                </Typography>

                {error && (
                    <Typography variant='body1' color='error' align='center' style={{ marginBottom: theme.spacing(2)}}>
                        {error}
                    </Typography>
                )}

                {validationError && (
                    <Typography variant='body1' color='error' align='center' style={{ marginBottom: theme.spacing(2)}}>
                        {validationError}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <TextField
                            fullWidth
                            id="username"
                            label="Usuario"
                            variant="outlined"
                            value={credentials.username}
                            onChange={handleChange}
                            
                        />
                    </Box>

                    <Box mb={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={credentials.password}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                                
                            />
                        </FormControl>
                    </Box>

                    <Box mb={3}>
                        <TextField
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            type="email"
                            variant="outlined"
                            value={credentials.email}
                            onChange={handleChange}
                            
                        />
                    </Box>

                    <Box textAlign='center'>
                        <Button variant="contained" color="primary" type="submit">
                            Registrarse
                        </Button>
                    </Box>
                </form>
            </Box>
        </Paper>
    );
};

export default SignupForm;

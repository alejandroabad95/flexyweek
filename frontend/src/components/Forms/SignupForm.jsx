import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ErrorMessage from '../ErrorMessage/ErrorMessage'; // Asegúrate de tener este componente correctamente implementado

const SignupForm = ({ onSignup, paperElevation, errors }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Llamar a la función de registro
        onSignup(credentials);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    console.log('Errors:', errors);

    return (
        <Paper elevation={paperElevation} style={{ marginBottom: theme.spacing(4) }}>
            <Box p={3}>
                <Typography variant='h1' align='center' style={{ marginBottom: 20 }}>
                    Registrarse
                </Typography>


                {/* Error no contemplado servidor */}
                {errors.serverSignup && <ErrorMessage message={errors.serverSignup} />} 


                {errors.validationGeneral && <ErrorMessage message={errors.validationGeneral} />}




                {errors.limitReached && <ErrorMessage message={errors.limitReached} />}
                
                <form onSubmit={handleSubmit} noValidate>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            id="username"
                            label="Usuario"
                            variant="outlined"
                            value={credentials.username}
                            onChange={handleChange}
                            error={!!errors.username || !!errors.serverUniqueUser}
                            helperText={errors.username || errors.serverUniqueUser}
                            required
                        />
                    </Box>

                    <Box mb={2}>
                        <FormControl fullWidth variant="outlined" error={!!errors.password}>
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
                            {errors.password && (
                                <FormHelperText>{errors.password}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>

                    <Box mb={2}>
                        <TextField
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            type="email"
                            variant="outlined"
                            value={credentials.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            required
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

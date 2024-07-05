import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput, FormHelperText, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';  
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const LoginForm = ({ onLogin,paperElevation,errors }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
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
        onLogin(credentials);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <Paper elevation={paperElevation} style={{}}>
            {/* Aplico espaciado con Box */}
            <Box p={3} style={{}}>

                <Typography variant='h1' align='center' style={{ marginBottom: theme.spacing(4) }} >
                    Acceder
                </Typography>

                {/* Error no contemplado servidor */}
                {errors.serverLogin && <ErrorMessage message={errors.serverLogin} />} 

                {errors.validationGeneral && <ErrorMessage message={errors.validationGeneral} />}

                {errors.serverLoginCredentials && <ErrorMessage message={errors.serverLoginCredentials} />}



                <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <TextField
                            fullWidth
                            id="username"
                            label="Usuario"
                            variant="outlined"
                            value={credentials.username}
                            onChange={handleChange}
                            // centremonos aquí
                            error={!!errors.username || !!errors.serverUniqueUser}
                            helperText={errors.username || errors.serverUniqueUser}

                        />
                    </Box>

                    <Box mb={4}>
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

                    <Box textAlign='center'>
                        <Button variant="contained" color="primary" type="submit">
                            Iniciar Sesión
                        </Button>
                    </Box>
                    
                </form>
            </Box>
        </Paper>
    );
};

export default LoginForm;

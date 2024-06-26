import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';  

const LoginForm = ({ onLogin,paperElevation,error }) => {
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

                {error && (
                    <Typography variant='body1' color='error' align='center' style={{ marginBottom: theme.spacing(2)}}>
                        {error}
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

                    <Box mb={4}>
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

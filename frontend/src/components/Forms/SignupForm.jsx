import React, { useState } from 'react';

const SignupForm = ({ onSignup, error }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });
    const [validationError, setValidationError] = useState('');

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value
        }));
    };

    // Función para validar el formato del correo electrónico
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que el correo electrónico no esté vacío y tenga un formato correcto
        if (!credentials.email) {
            setValidationError('El correo electrónico es obligatorio');
            return;
        } else if (!validateEmail(credentials.email)) {
            setValidationError('El formato del correo electrónico no es válido');
            return;
        }

        // Si todo es correcto, reseteamos el mensaje de error de validación y llamamos a la función de registro
        setValidationError('');
        onSignup(credentials);
    };

    return (
        <div>
            <h2>Registrarse</h2>
            {/* Mostrar error del backend si existe */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* Mostrar error de validación si existe */}
            {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default SignupForm;

import React, { useState } from 'react';

const SignupForm = ({ onSignup, error }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup(credentials);
    };

    return (
        <div>
            <h2>Registrarse</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default SignupForm;

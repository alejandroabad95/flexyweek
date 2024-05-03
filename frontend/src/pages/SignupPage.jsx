import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthService } from '../services/auth.service';

function SignupPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');
    const { signup } = useAuthService();

    const handleSignup = async () => {
        try {
            await signup(credentials.username, credentials.password, credentials.email);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div>
            <h2>Registrarse</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="email">Correo electrónico:</label>
                <input
                    type="email"
                    id="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
            </div>
            <button onClick={handleSignup}>Registrarse</button>
            <p>
                ¿Ya tienes cuenta? 
                <Link to="/login">Inicia sesión aquí</Link>
            </p>
        </div>
    );
}

export default SignupPage;

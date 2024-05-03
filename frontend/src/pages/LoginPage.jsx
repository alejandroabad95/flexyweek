import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthService } from '../services/auth.service';
import { useAuth } from '../contexts/auth.context';

function LoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuthService();
    const { user } = useAuth();

    // Utiliza useEffect para redirigir automáticamente si el usuario ya está autenticado
    useEffect(() => {
        if (user) {
            navigate('/activities');
        }
    }, [user, navigate]);

    const handleLogin = async () => {
    try {
        await login(credentials.username, credentials.password);
    } catch (e) {
        setError(e.message);
    }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
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
            <button onClick={handleLogin}>Iniciar Sesión</button>
            <p>
                ¿Todavía no estás registrado? <Link to="/signup">Regístrate aquí</Link>
            </p>
        </div>
    );
}

export default LoginPage;

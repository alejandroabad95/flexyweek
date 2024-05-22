import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthService } from '../services/auth.service';
import { useAuth } from '../contexts/auth.context';
import LoginForm from '../components/Forms/LoginForm';

function LoginPage() {
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

    const handleLogin = async (credentials) => {
        try {
            await login(credentials.username, credentials.password);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div>
            <LoginForm onLogin={handleLogin} error={error} />
            <p>
                ¿Todavía no estás registrado? <Link to="/signup">Regístrate aquí</Link>
            </p>
        </div>
    );
}

export default LoginPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthService } from '../services/auth.service';
import SignupForm from '../components/Forms/SignupForm';

function SignupPage() {
    const [error, setError] = useState('');
    const { signup } = useAuthService();

    const handleSignup = async (credentials) => {
        try {
            await signup(credentials.username, credentials.password, credentials.email);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div>
            <SignupForm onSignup={handleSignup} error={error} />
            <p>
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
        </div>
    );
}

export default SignupPage;

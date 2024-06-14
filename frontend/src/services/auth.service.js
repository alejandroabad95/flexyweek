import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';

export function useAuthService() {
    const navigate = useNavigate();
    const { updateUserState } = useAuth();

    async function login(username, password) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login/`, {
                username,
                password,
            });

            localStorage.setItem('Token', response.data.token);
            
            // Actualizar el estado del usuario
            updateUserState();

            // Redirigir a la página de actividades
            navigate('/activities');
        } catch (error) {
            console.error('Error al iniciar sesión:', error.response?.data);
            throw new Error('Nombre de usuario o contraseña incorrectos');
        }
    }

    async function signup(username, password, email) {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup/`, {
                username,
                password,
                email,
            });
            // Redirige al usuario a la página de inicio de sesión después del registro exitoso
            navigate('/login');
        } catch (error) {
            console.error('Error al registrarse:', error.response?.data);
            throw new Error('Error al registrarse. Por favor, verifica tus datos.');
        }
    }

    async function getProfile() {
        try {
            const token = localStorage.getItem('Token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            throw new Error('Error al obtener la información del perfil.');
        }
    }

    async function changePassword(oldPassword, newPassword) {
        try {
            const token = localStorage.getItem('Token');
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/change-password/`, {
                old_password: oldPassword,
                new_password: newPassword
            }, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            throw new Error('Error al cambiar la contraseña.');
        }
    }

    async function deleteAccount() {
        try {
            const token = localStorage.getItem('Token');
            await axios.delete(`${process.env.REACT_APP_API_URL}/auth/delete-account/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            localStorage.removeItem('Token');
            updateUserState(null);
            navigate('/signup');
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
            throw new Error('Error al eliminar la cuenta.');
        }
    }

    async function logout() {
        try {
            // Realiza una solicitud POST para cerrar sesión
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout/`);
            
            // Limpia el token de autenticación del almacenamiento local
            localStorage.removeItem('Token');
            
            // Llama a updateUserState para limpiar el estado de autenticación
            updateUserState(null);
            
            // Redirige al usuario a la página de inicio de sesión
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw new Error('Error al cerrar sesión.');
        }
    }



    return { signup, login, getProfile, logout, changePassword, deleteAccount};
}

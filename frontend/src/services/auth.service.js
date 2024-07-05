import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';

// *************************************************************
// DEFINICIÓN DE ERRORES
// *************************************************************

class ValidationError extends Error {
    constructor(validationErrors) {
        super('Error de validación');
        this.name = 'ValidationError';
        this.validationErrors = validationErrors;
    }
}

class ValidationServerError extends Error {
    constructor(validationServerErrors) {
        super('Error de validación en el servidor');
        this.name = 'ValidationServerError';
        this.validationServerErrors = validationServerErrors;
    }
}


class ServerError extends Error {
    constructor(serverErrors) {
        super('Error en el servidor');
        this.name = 'ServerError';
        this.serverErrors = serverErrors;
    }
}



export function useAuthService() {
    const navigate = useNavigate();
    const { updateUserState } = useAuth();

    // Función para validar las credenciales
    const validateCredentials = ({ username, password, email }) => {
        const errors = {};

        if (!username) {
            errors.username = 'El nombre de usuario es obligatorio';
        } else if (username.length < 3) {
            errors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
        }

        if (!password) {
            errors.password = 'La contraseña es obligatoria';
        } else if (password.length < 8) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        if (!email) {
            errors.email = 'El correo electrónico es obligatorio';
        } else if (!validateEmail(email)) {
            errors.email = 'El formato del correo electrónico no es válido';
        }

        return errors;
    };

    // Función para validar el formato del correo electrónico
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

// *************************************************************
// SIGNUP
// *************************************************************

    async function signup(username, password, email) {
        // Validar las credenciales
        const errors = validateCredentials({ username, password, email });

        // Si hay errores, lanzar una excepción con los errores
        if (Object.keys(errors).length > 0) {
            errors.validationGeneral = 'Por favor, corrige tus errores e inténtalo de nuevo'
            
            //Metemos en la clase ValidationError todos los errores de validation
            throw new ValidationError(errors);
        }

        try {
            // Verifica el número de usuarios registrados antes de intentar registrar uno nuevo
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/count-users/`);
            const userCount = response.data.count;
            

            if (userCount >= 50) {
                throw new ValidationServerError({
                    limitReached: 'Se ha alcanzado el límite máximo de usuarios registrados. Contacta con el administrador si quieres probar la app'
                });
            }

            // Si no se ha alcanzado el límite, procede con el registro
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup/`, {
                username,
                password,
                email,
            });

            // Redirige al usuario a la página de inicio de sesión después del registro exitoso
            navigate('/login');
        } catch (error) {

            // Manejar errores específicos de validación
            if (error instanceof ValidationError) {
                throw error;
            }
            
            if (error instanceof ValidationServerError) {
                throw error; // Lanza el error para que pueda ser capturado y manejado en el componente de React
            }

            const serverValidationErrors = {};
            if (error.response && error.response.data) {
                if (error.response.data.username) {
                    serverValidationErrors.serverUniqueUser = 'Este nombre de usuario ya existe';
                }
                if (error.response.data.email) {
                    serverValidationErrors.serverUniqueEmail = 'Este correo electrónico ya existe';
                }

                // Si hay errores de unicidad, también establecer un error general
                if (serverValidationErrors.serverUniqueUser || serverValidationErrors.serverUniqueEmail) {
                    serverValidationErrors.validationGeneral = 'Algunos datos ya existen en nuestra base de datos. Por favor, corrígelos';
                    throw new ValidationServerError(serverValidationErrors);
                }
            }
           
            // Mensaje genérico para otros errores de servidor no contemplados
            throw new ServerError({ serverSignup: 'Error en el servidor durante el proceso de registro. Por favor, inténtalo de nuevo más tarde.' });




        }
    }


// *************************************************************
// LOGIN
// *************************************************************

    async function login(username, password) {


        // Validar que el nombre de usuario y la contraseña no estén vacíos
        if (!username || !password) {
            throw new ValidationError({
                validationGeneral: 'Por favor, introduce todos los datos para iniciar sesión',
                username: 'El nombre de usuario no puede estar vacío',
                password: 'La contraseña no puede estar vacía'
            });
        }

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

            
            if (error.response && error.response.status === 401) {

                throw new ServerError({
                    serverLoginCredentials: 'Nombres de usuario/contraseña incorrectos',
                
            });
               
            } 

            // Mensaje genérico para otros errores de servidor no contemplados
            throw new ServerError({ serverLogin: 'Error en el servidor durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.' });
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

    return { signup, login, getProfile, logout, changePassword, deleteAccount };
}

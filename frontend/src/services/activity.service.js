import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

// Crea una instancia de axios con la URL base y los headers por defecto
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para obtener el token del almacenamiento local
const getToken = () => {
    return localStorage.getItem('Token');
};

// Función para verificar si el token está presente y configurarlo en la instancia de axios
const setToken = () => {
    const token = getToken();
    if (!token) {
        throw new Error('Credenciales de autenticación faltantes. Por favor, inicia sesión de nuevo.');
    }
    axiosInstance.defaults.headers['Authorization'] = `Token ${token}`;
};

// *************************************************************
// DEFINICIÓN DE ERRORES
// *************************************************************


// Errores generales en componente ErrorMessage y no generales en textfield


// Errores validación en frontend
class ValidationError extends Error {
    constructor(validationErrors) {
        super('Error de validación');
        this.name = 'ValidationError';
        this.validationErrors = validationErrors;
    }
}

// Errores validación backend lógica de negocio
class ValidationServerError extends Error {
    constructor(validationServerErrors) {
        super('Error de validación en el servidor');
        this.name = 'ValidationServerError';
        this.validationServerErrors = validationServerErrors;
    }
}

// Errores no contemplados
class ServerError extends Error {
    constructor(serverErrors) {
        super('Error en el servidor');
        this.name = 'ServerError';
        this.serverErrors = serverErrors;
    }
}

// *************************************************************
// FUNCIÓN VALIDAR ACTIVIDAD EN EL FRONTEND
// *************************************************************

const validateActivity = ( newActivity ) => {
    
    const errors = {};

    if (!newActivity.name) {
        errors.nameActivity = 'Por favor, complete el nombre de la actividad';
    } else if (newActivity.name.length > 30) {
        errors.nameActivity = 'La actividad no puede tener más de 30 caracteres';
    }

    return errors

}


// Función para crear una actividad
// const createActivity = async (newActivity) => {
//     try {
//         setToken();  // Configura el token

//         const response = await axiosInstance.post('/activities/create/', newActivity);
//         return response.data;
//     } catch (error) {
//         throw new Error('Hubo un problema al agregar la nueva actividad.');
//     }
// };



// *************************************************************
// CREAR ACTIVIDAD
// *************************************************************
const createActivity = async (newActivity) => {
    try {

        // Valida en el frontend la actividad
        const errors = validateActivity( newActivity );

        // Si hay errores, lanzar una excepción con los errores
        if (Object.keys(errors).length > 0) {
            //Metemos en la clase ValidationError todos los errores de validation
            throw new ValidationError(errors);
        }

        setToken();  // Configura el token
        const response = await axiosInstance.post('/activities/create/', newActivity);
        return response.data;
    } catch (error) {

        // Manejar errores específicos de validación en el frontend
            if (error instanceof ValidationError) {
                throw error;
            }
        // Manejar errores específicos de validación en el backend
            if (error instanceof ValidationServerError) {
                throw error; 
            }
        
            const serverValidationErrors = {};
            if (error.response && error.response.data) {
                if (error.response.data) {
                    serverValidationErrors.serverLimitActivities = 'Límite de actividades alcanzado, por favor elimina o reutiliza actividades para tus eventos ';
                    throw new ValidationServerError(serverValidationErrors);

                }
        
            }
           
            // Mensaje genérico para otros errores de servidor no contemplados
            throw new ServerError({ serverAddActivity: 'Error en el servidor al añadir actividad. Por favor, inténtalo de nuevo más tarde.' });
    }
};

// *************************************************************
// OBTENER ACTIVIDADES
// *************************************************************

const getActivities = async () => {
    try {
        setToken();  // Configura el token
        const response = await axiosInstance.get('/activities/');
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al obtener las actividades.');
    }
};



// *************************************************************
// ACTUALIZAR ACTIVIDAD
// *************************************************************

const updateActivity = async (activityId, updatedActivityData) => {
    try {

        // Valida en el frontend la actividad nueva que escribo de la que leeré el name
        const errors = validateActivity( updatedActivityData );

        // Si hay errores, lanzar una excepción con los errores
        if (Object.keys(errors).length > 0) {
            //Metemos en la clase ValidationError todos los errores de validation longitud o campo nombre vacío
            throw new ValidationError(errors);
        }

        setToken();  // Configura el token
        const response = await axiosInstance.put(`/activities/${activityId}/update/`, updatedActivityData);
        return response.data;
    } catch (error) {

        // Manejar errores específicos de validación en el frontend
        if (error instanceof ValidationError) {
            throw error;
        }

        // Mensaje genérico para otros errores de servidor no contemplados
        throw new ServerError({ serverEditActivity: 'Error del servidor al editar actividad. Por favor, inténtalo de nuevo más tarde.' });
    }
};

// *************************************************************
// ELIMINAR ACTIVIDAD
// *************************************************************

const deleteActivity = async (activityId) => {
    try {
        setToken();  // Configura el token
        const response = await axiosInstance.delete(`/activities/${activityId}/delete/`);
        if (response.status === 204) {
            return true;
        } else {
            throw new Error(`Hubo un problema al eliminar la actividad con ID ${activityId}.`);
        }
    } catch (error) {
        throw new Error(`Hubo un problema al eliminar la actividad con ID ${activityId}.`);
    }
};

export { getActivities, createActivity, updateActivity, deleteActivity };

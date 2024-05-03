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

// Función para obtener actividades
const getActivities = async () => {
    try {
        setToken();  // Configura el token
        const response = await axiosInstance.get('/activities/');
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al obtener las actividades.');
    }
};

// Función para crear una actividad
const createActivity = async (newActivity) => {
    try {
        setToken();  // Configura el token
        const response = await axiosInstance.post('/activities/create/', newActivity);
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al agregar la nueva actividad.');
    }
};

// Función para actualizar una actividad
const updateActivity = async (activityId, updatedActivityData) => {
    try {
        setToken();  // Configura el token
        const response = await axiosInstance.put(`/activities/${activityId}/update/`, updatedActivityData);
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al actualizar la actividad.');
    }
};

// Función para eliminar una actividad
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

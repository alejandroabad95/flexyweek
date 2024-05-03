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


// Función para obtener eventos de hoy
const getEventsToday = async () => {
    setToken(); // Asegurarse de que el token está configurado
    try {
        const response = await axiosInstance.get('/events/today/');
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al obtener los eventos de hoy.');
    }
};

// Función para obtener eventos completados
const getEventsCompleted = async () => {
    setToken(); // Asegurarse de que el token está configurado
    try {
        const response = await axiosInstance.get('/events/completed/');
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al obtener los eventos completados');
    }
};


// Función para obtener eventos completados
const getEventsNext = async () => {
    setToken(); // Asegurarse de que el token está configurado
    try {
        const response = await axiosInstance.get('/events/next/');
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al obtener los eventos completados');
    }
};





// Función para crear un nuevo evento
const createEvent = async (newEvent) => {
    setToken();
    try {
        const response = await axiosInstance.post('/events/create/', newEvent);
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al agregar el nuevo evento.');
    }
};

// Función para actualizar un evento existente
const updateEvent = async (eventId, updatedEventData) => {
    setToken();
    try {
        const response = await axiosInstance.put(`/events/${eventId}/update/`, updatedEventData);
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al actualizar el evento.');
    }
};

// Función para eliminar un evento
const deleteEvent = async (eventId) => {
    setToken();
    try {
        await axiosInstance.delete(`/events/${eventId}/delete/`);
        return true; // El evento se eliminó correctamente
    } catch (error) {
        throw new Error(`Hubo un problema al eliminar el evento con ID ${eventId}.`);
    }
};

export { getEventsToday,getEventsCompleted, getEventsNext, createEvent, updateEvent, deleteEvent };

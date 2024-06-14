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

// Función para crear un nuevo evento
const createEvent = async (newEvent) => {
    setToken();
    try {
        console.log('Datos del nuevo evento:', newEvent); // Imprimir datos del nuevo evento
        const response = await axiosInstance.post('/events/create/', newEvent);
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al agregar el nuevo evento.');
    }
};


// Función para obtener todos los eventos
const getEvents = async () => {
  setToken();
  try {
    const response = await axiosInstance.get('/events/');
    return response.data; // Esto devuelve los eventos obtenidos del backend
  } catch (error) {
    console.error('Hubo un error al obtener los eventos:', error);
    throw new Error('Hubo un error al obtener los eventos.');
  }
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



// Función para obtener eventos próximos
const getEventsNext = async () => {
    setToken(); // Asegurarse de que el token está configurado
    try {
        const response = await axiosInstance.get('/events/next/');
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al obtener los eventos completados');
    }
};

// Función para actualizar el estado de completado de un evento
const updateEventCompleted = async (eventId) => {
    setToken();
    try {
        const response = await axiosInstance.put(`/events/${eventId}/toggle-completed/`);
        return response.data;
    } catch (error) {
        throw new Error('Hubo un problema al marcar como completado el evento');
    }
};

// Función para adelantar o atrasar el día de un evento
const updateEventDay = async (eventId, direction) => {
    setToken();
    try {
        const response = await axiosInstance.put(`/events/${eventId}/${direction}/toggle-day/`);
        return response.data;
    } catch (error) {
        throw new Error(`Hubo un problema al cambiar el día del evento con ID ${eventId}`);
    }
};


const updateEventPosition = async (event1Id, event2Id) => {
  setToken();
  try {
    const response = await axiosInstance.put('/events/update-position/', {
      event1Id: event1Id,
      event2Id: event2Id,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Hubo un problema al intercambiar los eventos`);
  }
};



// Función para actualizar la actividad y objetivo de un evento
const updateEventInfo = async (eventId, newActivity, newGoal) => {
  setToken(); // Asegúrate de que el token de autenticación esté configurado correctamente
  try {
    const response = await axiosInstance.put(`/events/${eventId}/update/`, {
      // Envía los nuevos datos de actividad y objetivo del evento
      activity: newActivity,
      goal: newGoal,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Hubo un problema al actualizar la información del evento con ID ${eventId}`);
  }
};

const deleteEvent = async (eventId) => {
  setToken(); // Asegúrate de tener una función setToken() definida para establecer el token de autenticación si es necesario
  try {
    const response = await axiosInstance.delete(`/events/${eventId}/delete/`);
    return response.data;
  } catch (error) {
    throw new Error(`Hubo un problema al eliminar el evento con ID ${eventId}`);
  }
};



export { createEvent,getEvents,getEventsToday , getEventsNext, updateEventCompleted, updateEventDay, updateEventPosition, updateEventInfo, deleteEvent };

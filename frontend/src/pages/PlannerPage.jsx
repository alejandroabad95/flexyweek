import React, { useState, useEffect, useRef } from 'react';
import { getEvents, createEvent, updateEventPosition, updateEventInfo, deleteEvent } from '../services/event.service';

import EventTable from '../components/EventTable/EventTable';

import DraggedEventOverlay from '../components/Draggables/DraggedEventOverlay';

import CreateEventForm from '../components/Forms/CreateEventForm';
import UpdateEventForm from '../components/Forms/UpdateEventForm';
import DeleteEventForm from '../components/Forms/DeleteEventForm';

const PlannerPage = () => {
  const [events, setEvents] = useState([]);
  const [openCreateEventForm, setOpenCreateEventForm] = useState(false);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openUpdateEventForm, setOpenUpdateEventForm] = useState(false);
  const [openDeleteEventForm, setOpenDeleteEventForm] = useState(false);

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(1);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedEventPosition, setDraggedEventPosition] = useState({ x: 0, y: 0 });
  const touchTargetRef = useRef(null);

  // Estado para almacenar el ancla del menú desplegable para cada evento
  const [anchorElMap, setAnchorElMap] = useState({});

  // Estado para almacenar el evento seleccionado en el menú para cada evento
  const [selectedMenuEventMap, setSelectedMenuEventMap] = useState({});
 
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const events = await getEvents();
      setEvents(events);
      console.log(events);
    } catch (error) {
      console.error('Hubo un problema al obtener los eventos:', error.message);
    }
  };

  // Crear eventos 
  const handleOpenCreateEventForm = (day, priority) => {
    setSelectedDay(day);
    setSelectedPriority(priority);
    setOpenCreateEventForm(true);
  };



  const handleCloseCreateEventForm = () => {
    setOpenCreateEventForm(false);
  };

  const handleCreateEvent = async (eventData) => {
    console.log('Evento a crear:', eventData);
    setOpenCreateEventForm(false);
    try {
      const response = await createEvent(eventData);
      console.log('Evento creado con éxito:', response);
      fetchEvents();
    } catch (error) {
      console.error('Error al crear el evento:', error.message);
      setOpenCreateEventForm(true);
    }
  };



  // ACTUALIZACIÓN Y ELIMINACIÓN DE EVENTOS


  // Función para abrir el menú desplegable para un evento específico
  const handleClickMenuOpen = (event, eventData) => {
    
    setSelectedMenuEventMap({ ...selectedMenuEventMap, [eventData.id]: eventData });
    setAnchorElMap({ ...anchorElMap, [eventData.id]: event.currentTarget });
    
  };

  // Función para cerrar el menú desplegable para un evento específico
  const handleCloseMenu = (eventData) => {
    setSelectedMenuEventMap({ ...selectedMenuEventMap, [eventData.id]: null });
    setAnchorElMap({ ...anchorElMap, [eventData.id]: null });
  };

  // Función para abrir el modal de actualización del evento

  const handleOpenUpdateEventForm = (eventData) => {
    setSelectedEvent(eventData);
    setOpenUpdateEventForm(true);
  };

  // Función para cerrar la modal de actualización

  const handleCloseUpdateEventForm = () => {
    setOpenUpdateEventForm(false);
    };
  
  const handleUpdateEvent = async (updatedEventData) => {
      try {
        // Llama a la función de servicio para actualizar el evento
        await updateEventInfo(selectedEvent.id, updatedEventData.activity, updatedEventData.goal);
        console.log('Evento actualizado con éxito.');
        fetchEvents(); // Vuelve a cargar los eventos después de la actualización
        handleCloseUpdateEventForm(); // Cierra la modal de actualización del evento
      } catch (error) {
        console.error('Hubo un problema al actualizar el evento:', error.message);
      }
    };

  
  // FIN ACTUALIZACIÓN EVENTOS



  // MOVIMIENTO EVENTOS 

  const handleDragStart = (event, eventData) => {
    
      // Verificar si el clic se realizó en el objetivo
  if (event.target.tagName.toLowerCase() !== 'typography') {
    event.dataTransfer.setData('eventData', JSON.stringify(eventData));
    setDraggedEvent(eventData);
    setIsDragging(true);
  }
    
  };

  const handleTouchStart = (event, eventData) => {
  if (event.target.innerText === eventData.goal) {
    return; // No activar el arrastre si se hace clic en el "goal"
  }

  const touch = event.touches[0];
  setDraggedEvent(eventData);
  setDraggedEventPosition({ x: touch.clientX, y: touch.clientY });
  touchTargetRef.current = event.target;
  setIsDragging(true);
};


  const handleTouchMove = (event) => {
    if (isDragging) {
      event.preventDefault();
      const touch = event.touches[0];
      setDraggedEventPosition({ x: touch.clientX, y: touch.clientY });
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element !== touchTargetRef.current) {
        touchTargetRef.current = element;
      }
    }
  };

  const handleTouchEnd = async (event) => {
    if (!draggedEvent) return;

    const touch = event.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.closest('td')) {
      const day = element.closest('td').getAttribute('data-day');
      const priority = element.closest('td').getAttribute('data-priority');
      if (day && priority) {
        console.log('Touch end:', draggedEvent.id, 'in day:', day, 'priority:', priority);
        try {
          await updateEventPosition(draggedEvent.id, day, parseInt(priority, 10));
          console.log('Posición del evento actualizada con éxito.');
          fetchEvents();
        } catch (error) {
          console.error('Hubo un problema al actualizar la posición del evento:', error.message);
        }
        setDraggedEvent(null);
      }
    }
    setIsDragging(false);
  };

  const handleDrop = async (event, day, priority) => {
    event.preventDefault();
    let eventData;
    if (event.dataTransfer) {
      eventData = JSON.parse(event.dataTransfer.getData('eventData'));
    } else {
      eventData = draggedEvent;
    }
    if (eventData) {
      console.log('Drop:', eventData, 'in day:', day, 'priority:', priority);
      try {
        await updateEventPosition(eventData.id, day, priority);
        console.log('Posición del evento actualizada con éxito.');
        fetchEvents();
      } catch (error) {
        console.error('Hubo un problema al actualizar la posición del evento:', error.message);
      }
      setDraggedEvent(null);
    }
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log('El evento arrastrado está sobre el área de destino.');
  };

  const filterEvents = (day, priority) => {
    return events.filter((event) => event.day === day && event.priority === priority);
  };

  // Eventos eliminación 

  const handleOpenDeleteEventForm = (eventData) => {
    setSelectedEvent(eventData);
    setOpenDeleteEventForm(true);
  };

  const handleCloseDeleteEventForm = () => {
    setOpenDeleteEventForm(false);
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(selectedEvent.id);
      console.log('Evento eliminado con éxito.');
      fetchEvents();
      handleCloseDeleteEventForm();
    } catch (error) {
      console.error('Hubo un problema al eliminar el evento:', error.message);
    }
  };

  const priorityLevels = [1, 2, 3, 4, 5, 6];
  const Week = ['Mon', 'Tue', 'Wed', 'Thu'];
  const WeekHeaders = ['L', 'M', 'X', 'J'];
  const Weekend = ['Fri', 'Sat', 'Sun'];
  const WeekendHeaders = ['V', 'S', 'D'];

  const numColumnsWeek = Week.length;
  const numColumnsWeekend = Weekend.length;


  return (
    <>
      <EventTable
      WeekHeaders={WeekHeaders}
      Week={Week}
      priorityLevels={priorityLevels}
      numColumnsWeek={numColumnsWeek}
      filterEvents={filterEvents}
      handleDragStart={handleDragStart}
      handleTouchStart={handleTouchStart}
      handleTouchMove={handleTouchMove}
      handleTouchEnd={handleTouchEnd}
      handleClickMenuOpen={handleClickMenuOpen}
      anchorElMap={anchorElMap}
      selectedMenuEventMap={selectedMenuEventMap}
      handleCloseMenu={handleCloseMenu}
      handleOpenUpdateEventForm={handleOpenUpdateEventForm}
      handleOpenDeleteEventForm={handleOpenDeleteEventForm}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      handleOpenCreateEventForm={handleOpenCreateEventForm}
      isDragging={isDragging}
      />
      
      <div style={{ marginTop: '5vh' }}></div>
      
      <EventTable
      WeekHeaders={WeekendHeaders}
      Week={Weekend}
      priorityLevels={priorityLevels}
      numColumnsWeek={numColumnsWeekend}
      filterEvents={filterEvents}
      handleDragStart={handleDragStart}
      handleTouchStart={handleTouchStart}
      handleTouchMove={handleTouchMove}
      handleTouchEnd={handleTouchEnd}
      handleClickMenuOpen={handleClickMenuOpen}
      anchorElMap={anchorElMap}
      selectedMenuEventMap={selectedMenuEventMap}
      handleCloseMenu={handleCloseMenu}
      handleOpenUpdateEventForm={handleOpenUpdateEventForm}
      handleOpenDeleteEventForm={handleOpenDeleteEventForm}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      handleOpenCreateEventForm={handleOpenCreateEventForm}
      isDragging={isDragging}
    />

      <CreateEventForm
        open={openCreateEventForm}
        handleClose={handleCloseCreateEventForm}
        day={selectedDay}
        priority={selectedPriority}
        handleCreateEvent={handleCreateEvent}
      />

      <UpdateEventForm
      open={openUpdateEventForm}
      handleClose={handleCloseUpdateEventForm}
      eventData={selectedEvent}
      handleUpdateEvent={handleUpdateEvent}
      />
      
      <DeleteEventForm
        open={openDeleteEventForm}
        handleClose={handleCloseDeleteEventForm}
        handleDelete={handleDeleteEvent}
      />

      <DraggedEventOverlay
        isDragging={isDragging}
        draggedEvent={draggedEvent}
        draggedEventPosition={draggedEventPosition}
      />

    </>
  );
};

export default PlannerPage;

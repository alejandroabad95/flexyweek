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

  const [canDrag, setCanDrag] = useState(false);
  
  const [draggedEventPosition, setDraggedEventPosition] = useState({ x: 0, y: 0 });
  const touchTargetRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false); // Nuevo estado para mostrar el menú


 
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const events = await getEvents();
      setEvents(events);
      
    } catch (error) {
      console.error('Hubo un problema al obtener los eventos:', error.message);
    }
  };

  // Crear eventos 
  const handleOpenCreateEventForm = (day, priority) => {
    setSelectedDay(day);
    setSelectedPriority(priority);
    setOpenCreateEventForm(true); // Mantiene abierto el documento
  };



  const handleCloseCreateEventForm = () => {
    setOpenCreateEventForm(false);
  };

  const handleCreateEvent = async (eventData) => {
   
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




  // Función para mostrar el menú al hacer clic en el icono de engranaje
  const handleShowMenu = () => {
    setCanDrag(false);
    setShowMenu(!showMenu);
    setIsDragging(false);
      
  };




  // Función para abrir el modal de actualización del evento

  const handleOpenUpdateEventForm = (eventData) => {
    setCanDrag(false);
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
    // setIsDragging(true);
  }
    
  };

  const handleTouchStart = (event, eventData) => {

    setCanDrag(true);

    if (canDrag) {
    
      const touch = event.touches[0];
    
      setDraggedEvent(eventData);
      setDraggedEventPosition({ x: touch.clientX, y: touch.clientY });
      touchTargetRef.current = event.target;

      setIsDragging(true);
    }


  };


  const handleTouchMove = (event) => {
    if (isDragging) {
      // event.preventDefault();
      const touch = event.touches[0];
      setDraggedEventPosition({ x: touch.clientX, y: touch.clientY });
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element !== touchTargetRef.current) {
        touchTargetRef.current = element;
      }
    }
  };

///////////////////////////////////////////////////////////////////////////////
  
  // const handleTouchEnd = async () => {
  //   if (draggedEvent) {
  //     const element = document.elementFromPoint(draggedEventPosition.x, draggedEventPosition.y);
  //     if (element && element.closest('td')) {
  //       const day = element.closest('td').getAttribute('data-day');
  //       const priority = element.closest('td').getAttribute('data-priority');
  //       if (day && priority) {
  //         console.log(draggedEvent.id, 'Evento soltado en el día:', day, 'con prioridad:', priority);
          
  //         const filterEvent = events.filter((event) => (event.day === day && event.priority === Number(priority)))
  //         const targetEvent = filterEvent[0]
        

  //         try {
  //           await updateEventPosition(draggedEvent.id, targetEvent.id);
  //           console.log('Posiciones de los eventos actualizadas con éxito.');
  //           fetchEvents();  // Recargar eventos para reflejar los cambios
  //       } catch (error) {
  //           console.error('Hubo un problema al actualizar las posiciones de los eventos:', error.message);
  //       }
        
  //       }


  //     }
  //     setDraggedEvent(null);
  //   }
  //   setIsDragging(false);
  // };


  const handleTouchEnd = async () => {
    if (draggedEvent) {
      const element = document.elementFromPoint(draggedEventPosition.x, draggedEventPosition.y);
      if (element && element.closest('td')) {
        const day = element.closest('td').getAttribute('data-day');
        const priority = element.closest('td').getAttribute('data-priority');
        if (day && priority) {
          console.log(draggedEvent.id, 'Evento soltado en el día:', day, 'con prioridad:', priority);
          const filterEvent = events.filter((event) => event.day === day && event.priority === Number(priority));
          const targetEvent = filterEvent[0];
          try {
            if (targetEvent) {
              await updateEventPosition(draggedEvent.id, targetEvent.id);
            } else {
              await updateEventPosition(draggedEvent.id, null, day, priority);
            }
            console.log('Posiciones de los eventos actualizadas con éxito.');
            fetchEvents();
          } catch (error) {
            console.error('Hubo un problema al actualizar las posiciones de los eventos:', error.message);
          }
        }
      }
      setDraggedEvent(null);
    }
    setIsDragging(false);
  };


  // const handleDrop = async (e, targetEvent) => {
  //   e.preventDefault();
   
  //   let draggedEventData;
  //   if (e.dataTransfer) {
  //       draggedEventData = JSON.parse(e.dataTransfer.getData('eventData'));
  //   } else {
  //       draggedEventData = draggedEvent;
  //   }

  //   if (draggedEventData && targetEvent) {
  //       try {
  //           await updateEventPosition(draggedEventData.id, targetEvent.id);
  //           console.log('Posiciones de los eventos actualizadas con éxito.');
  //           fetchEvents();  // Recargar eventos para reflejar los cambios
  //       } catch (error) {
  //           console.error('Hubo un problema al actualizar las posiciones de los eventos:', error.message);
  //       }
  //   } else {
  //       console.error('Datos insuficientes para actualizar las posiciones de los eventos.');
  //   }
  //   setDraggedEvent(null);
  //   setIsDragging(false);
  // };
  

  const handleDrop = async (e, targetEvent, day, priority) => {
    e.preventDefault();
    let draggedEventData;

    if (e.dataTransfer) {
      draggedEventData = JSON.parse(e.dataTransfer.getData('eventData'));
    } else {
      draggedEventData = draggedEvent;
    }

    if (draggedEventData) {
      try {
        if (targetEvent) {
          await updateEventPosition(draggedEventData.id, targetEvent.id);
        } else {
      
          if (day !== null && priority !== null) {
            console.log('entro aquí????')
            await updateEventPosition(draggedEventData.id, null, day, priority);


          } else {

            console.error('Día y/o prioridad no válidos:', day, priority);
          }

        }
        console.log('Posiciones de los eventos actualizadas con éxito.');
        fetchEvents();
      } catch (error) {
        console.error('Hubo un problema al actualizar las posiciones de los eventos:', error.message);
      }
    } else {
      console.error('Datos insuficientes para actualizar las posiciones de los eventos.');
    }

    setDraggedEvent(null);
    setIsDragging(false);
  };










  // const handleDrop = async (event, day, priority) => {
  //   event.preventDefault();
  //   let eventData;
  //   if (event.dataTransfer) {
  //     eventData = JSON.parse(event.dataTransfer.getData('eventData'));
  //   } else {
  //     eventData = draggedEvent;
  //   }
  //   if (eventData) {
  //     console.log('Drop:', eventData, 'in day:', day, 'priority:', priority);
  //     try {
  //       await updateEventPosition(eventData.id, day, priority);
  //       console.log('Posición del evento actualizada con éxito.');
  //       fetchEvents();
  //     } catch (error) {
  //       console.error('Hubo un problema al actualizar la posición del evento:', error.message);
  //     }
  //     setDraggedEvent(null);
  //   }
  //   setIsDragging(false);
  // };



  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const filterEvents = (day, priority) => {
    return events.filter((event) => event.day === day && event.priority === priority);
  };

  // Eventos eliminación 

  const handleOpenDeleteEventForm = (eventData) => {
    setCanDrag(false);
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
      handleShowMenu={handleShowMenu}
      showMenu={showMenu}
      handleOpenCreateEventForm={handleOpenCreateEventForm}
      handleOpenUpdateEventForm={handleOpenUpdateEventForm}
      handleOpenDeleteEventForm={handleOpenDeleteEventForm}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      
      
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
      
      handleShowMenu={handleShowMenu}
      showMenu={showMenu}

      handleOpenCreateEventForm={handleOpenCreateEventForm}
      handleOpenUpdateEventForm={handleOpenUpdateEventForm}
      handleOpenDeleteEventForm={handleOpenDeleteEventForm}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      
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

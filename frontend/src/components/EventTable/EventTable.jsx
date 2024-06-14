import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import EventPaper from './EventPaper';
import EventEmptyPaper from './EventEmptyPaper';

const EventTable = ({ WeekHeaders, Week, priorityLevels, numColumnsWeek, filterEvents, handleDragStart, handleTouchStart, handleTouchMove, handleTouchEnd,
  handleShowMenu, showMenu,handleOpenUpdateEventForm, handleOpenDeleteEventForm, handleDragOver, handleDrop, handleOpenCreateEventForm 
}) => {

  return (
    <Paper sx={{ height: '38vh', overflow: 'auto', margin: '0px 10px' }}>
      <TableContainer sx={{ height: '100%', overflowX: 'initial' }}>
        <Table stickyHeader sx={{ zIndex: '1' }}>
          <TableHead>
            <TableRow sx={{ height: '5vh' }}>
              {WeekHeaders.map((day) => (
                <TableCell key={day} sx={{}}>
                  
                  <Typography variant="h3" color="initial" sx={{ fontWeight: 'bold' }}>
                    {day}
                  </Typography>


                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {priorityLevels.map((priority) => (
              <TableRow sx={{ height: '11vh' }} key={priority}>
                {Week.map((day) => (
                  <TableCell
                    key={`${day}-${priority}`}
                    data-day={day}
                    data-priority={priority}
                    sx={{ width: `${100 / numColumnsWeek}%`, height: '11vh', overflow: 'hidden', border: 'none' }}
                  >
               
                    {filterEvents(day, priority).length > 0 ? (
                      filterEvents(day, priority).map((event) => (
                        <EventPaper
                          key={event.id}
                          event={event}

                          handleShowMenu={handleShowMenu}
                          showMenu={showMenu}

                          handleOpenUpdateEventForm={handleOpenUpdateEventForm}
                          handleOpenDeleteEventForm={handleOpenDeleteEventForm}
                          
                          handleDragStart={handleDragStart}
                          handleTouchStart={handleTouchStart}
                          handleTouchMove={handleTouchMove}
                          handleTouchEnd={handleTouchEnd}
                          
                          handleDragOver={handleDragOver}
                          handleDrop={handleDrop}

                         
                         

                        />
                      ))


                    )
                      
                      :
                      
                      (
                      // Mostrar EventEmptyPaper si existen eventos con un nivel de prioridad anterior o si la prioridad es 1
                      (priority === 1 || filterEvents(day, priority - 1).length > 0) && (
                        <EventEmptyPaper
                          day={day}
                          priority={priority}
                          handleOpenCreateEventForm={handleOpenCreateEventForm}
                        />
                      )
                    )
                      
                    
                    
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EventTable;

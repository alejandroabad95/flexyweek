import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EventPaper from './EventPaper';
import EventEmptyPaper from './EventEmptyPaper';

const EventTable = ({ WeekHeaders, Week, priorityLevels, numColumnsWeek, filterEvents, handleDragStart, handleTouchStart, handleTouchMove, handleTouchEnd,
handleClickMenuOpen, anchorElMap, selectedMenuEventMap, handleCloseMenu, handleOpenUpdateEventForm, handleOpenDeleteEventForm, handleDragOver, handleDrop, handleOpenCreateEventForm 
}) => {

  return (
    <Paper sx={{ height: '38vh', overflow: 'auto', margin: '0px 10px' }}>
      <TableContainer sx={{ height: '100%', overflowX: 'initial' }}>
        <Table stickyHeader sx={{ zIndex: '1' }}>
          <TableHead>
            <TableRow sx={{ height: '5vh' }}>
              {WeekHeaders.map((day) => (
                <TableCell key={day}>{day}</TableCell>
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
                    sx={{ width: `${100 / numColumnsWeek}%`, height: '11vh', overflow: 'hidden' }}
                  >
                    {filterEvents(day, priority).length > 0 ? (
                      filterEvents(day, priority).map((event) => (
                        <EventPaper
                          key={event.id}
                          event={event}
                          anchorElMap={anchorElMap}
                          selectedMenuEventMap={selectedMenuEventMap}
                          handleClickMenuOpen={handleClickMenuOpen}
                          handleCloseMenu={handleCloseMenu}
                          handleOpenUpdateEventForm={handleOpenUpdateEventForm}
                          handleOpenDeleteEventForm={handleOpenDeleteEventForm}
                          handleDragStart={handleDragStart}
                          handleTouchStart={handleTouchStart}
                          handleTouchMove={handleTouchMove}
                          handleTouchEnd={handleTouchEnd}
                        />
                      ))
                    ) : (
                      <EventEmptyPaper
                        day={day}
                        priority={priority}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleOpenCreateEventForm={handleOpenCreateEventForm}
                      />
                    )}
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

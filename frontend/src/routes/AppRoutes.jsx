import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

import ActivitiesPage from '../pages/ActivitiesPage';
import PlannerPage from '../pages/PlannerPage';
import SchedulePage from '../pages/SchedulePage';

import ProtectedRoute from './ProtectedRoutes';


function AppRoutes() {
  return (

    <Routes>
      
      {/* Redirigir la ruta raíz a /login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Página de inicio de sesión */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Página de inicio de sesión */}
      <Route path="/signup" element={<SignupPage />} />
      

      
      {/* Otras rutas */}
     
       
      <Route element={<ProtectedRoute />}>
        
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/schedule" element={<SchedulePage />}/>

      </Route>
      
      </Routes>

  );
}

export default AppRoutes;
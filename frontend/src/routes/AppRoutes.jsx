import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import PrivacyPage from '../pages/PrivacyPage'

import ActivitiesPage from '../pages/ActivitiesPage';
import PlannerPage from '../pages/PlannerPage';
import SchedulePage from '../pages/SchedulePage';
import ProfilePage from '../pages/ProfilePage'

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

      {/* Página de política de privacidad */}
      <Route path="/privacy-policy" element={<PrivacyPage />} />
      


      
      {/* Otras rutas */}
     
       
      <Route element={<ProtectedRoute />}>


        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/schedule" element={<SchedulePage />}/>

      </Route>
      
      </Routes>

  );
}

export default AppRoutes;
import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context'; // Asegúrate de importar correctamente el contexto de autenticación

const ProtectedRoute = () => {
  const { user, loading } = useAuth(); // Obtenemos el usuario y el estado de carga del contexto de autenticación
  const [authChecked, setAuthChecked] = useState(false);

  // Verificamos si el usuario ha sido cargado
  useEffect(() => {
    if (!loading) {
      setAuthChecked(true);
    }
  }, [loading]);

  // Si el usuario aún no ha sido cargado, mostramos un mensaje de carga
  if (!authChecked) {
    return <p>Cargando...</p>;
  }

  // Verificamos si hay un usuario autenticado
  return (
    user ? <Outlet /> : <Navigate to="/login/" />
  );
};

export default ProtectedRoute;

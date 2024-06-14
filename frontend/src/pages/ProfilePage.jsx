import React, { useEffect, useState } from 'react';
import { useAuthService } from '../services/auth.service';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const { getProfile, changePassword, deleteAccount } = useAuthService();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.error('Error al obtener la información del perfil:', error);
            }
        };

        // Solo llamar a fetchProfile si profile es null
        if (!profile) {
            fetchProfile();
        }
    }, [profile, getProfile]); // Asegúrate de que esta lista de dependencias incluya getProfile y profile

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async () => {
        try {
            await changePassword(oldPassword, newPassword);
            alert('Contraseña cambiada con éxito');
        } catch (error) {
            alert('Error al cambiar la contraseña');
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            try {
                await deleteAccount();
                alert('Cuenta eliminada con éxito');
            } catch (error) {
                alert('Error al eliminar la cuenta');
            }
        }
    };

    if (!profile) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Bienvenido a tu perfil</h1>
            <p><strong>Nombre de usuario:</strong> {profile.username}</p>
            <p><strong>Correo electrónico:</strong> {profile.email}</p>

            <h2>Cambiar Contraseña</h2>
            <div>
                <input
                    type="password"
                    placeholder="Contraseña antigua"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={handleChangePassword}>Cambiar Contraseña</button>
            </div>

            <h2>Eliminar Cuenta</h2>
            <button onClick={handleDeleteAccount}>Eliminar Cuenta</button>
        </div>
    );
};

export default ProfilePage;

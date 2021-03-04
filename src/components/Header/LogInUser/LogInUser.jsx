import React, { useContext, useState } from 'react';
import './LogInUser.css';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const LogInUser = () => {
    const history = useHistory();
    const { currentUser, logOut } = useAuth();
    const [openSettings, setOpenSettings] = useState(false);

    const handleLogout = async () => {
        await logOut();
    }

    const openUserSettings = () => {
        setOpenSettings(true);
    }

    return (
        <div className="user-form">
            <div className="user-name">
                <span className="user-description" onClick={() => openUserSettings()}>Hi, {currentUser?.name}</span>
                {openSettings ? <div className="modal-user">
                    <Link to="personalinfo"><span
                        onClick={() => setOpenSettings(false)}
                    >Account Settings</span></Link>
                    <span className="log-out-btn" onClick={() => {
                        handleLogout();
                        history.push("/");
                        }}>Log Out</span>
                    <div className="close-settings"
                        onClick={() => setOpenSettings(false)}
                    >Close Settings</div>
                </div> : null } 
            </div>
            {currentUser?.email === 'admin@gmail.com' ? 
            <Link to="/admin"><div className="end__admin-btn">Admin</div></Link>
            : null }
        </div>
    );
};

export default LogInUser;
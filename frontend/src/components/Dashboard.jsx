// frontend\src\components\Dashboard.jsx

import React, { useEffect } from 'react';
import AuthUser from '../utils/AuthUser';

const Dashboard = () => {
    const { getUser, me, isAuthenticated } = AuthUser();
    const user = getUser();

    return (
        <div>
            {isAuthenticated() ? (
                <div>Welcome {user.name}!</div>
            ) : (
                <div>Access Denied. Please log in.</div>
            )}
        </div>
    );
}

export default Dashboard;

import React, { useEffect, useState } from 'react';
import AuthUser from '../utils/AuthUser';

const Profile = () => {
    const { getUser, isAuthenticated } = AuthUser();
    const [profileData, setProfileData] = useState(getUser());

    useEffect(() => {
        const fetchProfileData = async () => {
            if (isAuthenticated()) {
                try {
                    const res = await me();
                    setProfileData(res);
                } catch (err) {
                    console.log(err);
                }
            }
        };

        fetchProfileData();
    }, [isAuthenticated]);

    return (
        <div>
            {isAuthenticated() ? (
                <div>
                    <h2>Profile Information</h2>
                    <p>Name: {profileData.name}</p>
                    <p>Email: {profileData.email}</p>
                </div>
            ) : (
                <div>Access Denied. Please log in.</div>
            )}
        </div>
    );
}

export default Profile;

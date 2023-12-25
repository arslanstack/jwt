import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthUser = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        const userToken = getToken();
        if (userToken) {
            setToken(userToken);
        }
    }, []);

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = localStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const saveToken = (user, token) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/dashboard');
    }

    const clearToken = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('');
        setUser('');
    }

    const isAuthenticated = () => {
        const token = getToken();
        if (token) {
            return true;
        }
        else {
            return false;
        }
    }

    const http = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    const register = (name, email, password) => {
        return http.post('/register', { name, email, password });
    }

    const login = (email, password) => {
        return http.post('/login', { email, password })
            .then(res => {
                saveToken(res.data.user, res.data.access_token);
            });
    }

    const logout = async () => {
        try {
            await http.post('/logout');
            clearToken();
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return {
        register,
        login,
        logout,
        saveToken,
        getToken,
        getUser,
        isAuthenticated
    }
}

export default AuthUser;

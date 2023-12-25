import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthUser = () => {

    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');


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


    const http = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            'Content-type': 'application/json'
        }
    });

    const register = (name, email, password) => {
        return http.post('/register', { name, email, password });
    }

    const login = (email, password) => {
        return http.post('/login', { email, password });
    }

    const logout = () => {
        return http.post('/logout', {}, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setToken('');
            setUser('');
            navigate('/');
        }).catch(err => {
            console.log(err);
        });
    }

    const me = () => {
        return http.post('/me', {}, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        
        }).then(res => {
            return res.data;
        }).catch(err => {
            console.log(err);
        });

    }

    const refreshToken = () => {
        return http.post('/refresh');
    }

    return {
        register,
        login,
        logout,
        me,
        refreshToken,
        saveToken,
        getToken,
        getUser
    }
}

export default AuthUser;
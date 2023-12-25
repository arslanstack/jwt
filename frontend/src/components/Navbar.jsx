import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from '../utils/AuthUser';

const Navbar = () => {
    const { isAuthenticated, logout } = AuthUser();
    const token = isAuthenticated();

    const handleLogout = async () => {
        if (token) {
            try {
                await logout();
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand mx-4" to="/">Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            {token ? (
                <div className="collapse navbar-collapse justify-content-end mx-4" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => handleLogout()}>Logout</button>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="collapse navbar-collapse justify-content-end mx-4" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;

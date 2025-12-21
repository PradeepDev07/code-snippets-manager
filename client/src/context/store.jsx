import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookies';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const token = Cookies.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (userData, token) => {
        Cookies.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

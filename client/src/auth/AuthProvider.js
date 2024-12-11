import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
    const [email, setEmail] = useState(() => localStorage.getItem("email") || null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("email");
        if (token) setIsLoggedIn(true);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const login = (token, email) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        setIsLoggedIn(true);
        setEmail(email);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        setEmail(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


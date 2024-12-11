//Ella Young
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

        const interval = setInterval(() => {
            const loginTimestamp = localStorage.getItem("loginTimestamp");
            if (loginTimestamp) {
                const elapsedTime = Date.now() - parseInt(loginTimestamp, 10);
                if (elapsedTime > 1 * 60 * 60 * 1000) {
                    logout();
                    alert("You have been automatically logged out due to inactivity.");
                }
            }
        }, 60000); 

        return () => clearInterval(interval); 
    }, []);

    const login = (token, email) => {
        const timestamp = Date.now();
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("loginTimestamp", timestamp); 
        setIsLoggedIn(true);
        setEmail(email);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("loginTimestamp");
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

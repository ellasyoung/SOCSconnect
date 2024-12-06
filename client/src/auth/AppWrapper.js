import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider"; 

const AppWrapper = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { logout } = useContext(AuthContext); 

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const handleUnload = async () => {
      try {
        const token = localStorage.getItem("token");
        if (isLoggedIn && token) {
          await axios.post(
            `${backendUrl}/api/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        logout(); 
      } catch (error) {
        console.error("Error deleting session:", error);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [isLoggedIn, logout, backendUrl]);

  return <>{children}</>;
};

export default AppWrapper;

import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider"; 

const AppWrapper = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { logout } = useContext(AuthContext); 

  useEffect(() => {
    const handleUnload = async () => {
      try {
        const token = localStorage.getItem("token");
        if (isLoggedIn && token) {
          await axios.post(
            "http://localhost:5001/api/logout",
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
  }, [isLoggedIn, logout]);

  return <>{children}</>;
};

export default AppWrapper;

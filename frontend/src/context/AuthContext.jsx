import { AuthContext } from "../context/AuthContext";
import { useState } from "react";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        const token = userData.token || userData.user?.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData.user));
        setUser(userData.user);
    };

    const logout =() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


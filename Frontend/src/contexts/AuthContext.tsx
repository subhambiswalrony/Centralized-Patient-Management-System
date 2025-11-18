import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, role: string) => Promise<any>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
  fetchUser: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("CPMS-Auth-token");
    if (!token) {
      setLoading(false);
      return;
    }

    try{
      const res = await axios.get(`http://localhost:5000/api/user/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.userInfo);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("CPMS-Auth-token");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  (async () => {
    await fetchUser();
  })();
}, []);

 // user login
  const login = async (email: string, password: string, role: string) => {
  console.log("Login attempt for role:", role);
  const loginPath = role === 'doctor' 
    ? 'doctorLogin' 
    : role === 'admin' 
    ? 'adminLogin' 
    : 'login';

  try {
    const res = await axios.post(`http://localhost:5000/api/auth/${loginPath}`, {
      email,
      password,
    });

    // Normalized return
    if (res.status === 200) {
      localStorage.setItem("CPMS-Auth-token", res.data.accessToken);
      const userData = res.data.patientInfo || res.data.doctorInfo || res.data.adminInfo;

      setUser(userData);
      setIsAuthenticated(true);

      return {
        success: true,
        status: 200,
        user: userData,
        message: "Login successful",
      };
    }

    return {
      success: false,
      status: res.status,
      message: res.data.message || "Login failed",
    };

  } catch (err) {
    console.error("Login failed:", err);

    return {
      success: false,
      status: err.response?.status || 500,
      message: err.response?.data?.message || "Login failed",
    };
  }
};


  //user logout
  const logout = () => {
    localStorage.removeItem("CPMS-Auth-token");
    setUser(null);
    setIsAuthenticated(false);
  };

   return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

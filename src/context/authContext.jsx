import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { getService } from "../service/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data", error);
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("You have been logged out successfully");
  }, []);

  const login = useCallback((authToken) => {
    // Only set token and authentication status initially
    setToken(authToken);
    setIsAuthenticated(true);
    localStorage.setItem("token", authToken);
    toast.success("Login successful");
  }, []);

  const fetchUserDetails = useCallback(async () => {
    if (!token || user) return; // Skip if no token or user already exists

    // Basic token validation
    if (typeof token !== 'string' || token.split('.').length !== 3) {
      console.error('Invalid token format');
      logout();
      return;
    }

    setIsLoadingUser(true);
    try {
      const response = await getService("/user/profile");
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("User details fetch error:", error);
      toast.error("Failed to load user details");
      logout();
    } finally {
      setIsLoadingUser(false);
    }
  }, [token, user, logout]);

  //Effect to sync state with localStorage
  
  
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      if (user) {
        try {
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Failed to stringify user data", error);
        }
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // Effect to fetch user details when authenticated but user is null
  useEffect(() => {
    if (isAuthenticated && !user && token) {
      fetchUserDetails();
    }
  }, [isAuthenticated, user, token, fetchUserDetails]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoadingUser,
        login,
        logout,
        fetchUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

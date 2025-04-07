import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./layout/DashboardLayout";
import { useAuth } from "./context/authContext";
import { Navigate } from "react-router";
import DashboardHome from "./components/dashboard/DashboardHome";
import CourseModule from "./components/dashboard/CourseModule";
import UserProfile from "./components/dashboard/UserProfile";
import Logout from "./pages/Logout";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <Home />
          </AuthRoute>
        }
      />

      <Route
        path="/login"
        element={
          <AuthRoute>
            <Auth login={true} />
          </AuthRoute>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthRoute>
            <Auth login={false} />
          </AuthRoute>
        }
      />

      {/* All protected routes with Dashboard layout */}
      <Route
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/course-module" element={<CourseModule />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Route>

      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default App;

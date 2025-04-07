import { NavLink } from "react-router";
import Icon from "../Icon";
import Logo from "../Logo";
import { useAuth } from "../../context/authContext";

const Sidebar = ({ hide, hideBar }) => {
  const { logout } = useAuth();

  return (
    <aside className={hide ? "hide-side-bar" : ""}>
      <div className="logo-and-navlinks">
        <div className="with-cancel-btn">
          <Logo center={true} />
          <button onClick={hideBar}>X</button>
        </div>
        <nav>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="icon-box">
              <Icon icon="dash" />
            </div>
            Dashboard
          </NavLink>

          <NavLink
            to="/course-module"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="icon-box">
              <Icon icon="module" />
            </div>
            Course Module
          </NavLink>

          <NavLink
            to="/user-profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="icon-box">
              <Icon icon="profile" />
            </div>
            User Profile
          </NavLink>
        </nav>
      </div>

      <button onClick={logout} className="logout-btn">
        <div className="icon-box">
          <Icon icon="logout" />
        </div>
        <span>logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;

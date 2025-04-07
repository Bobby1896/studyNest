import PropTypes from "prop-types";
import "../styles/auth.scss";
import Logo from "../components/Logo";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import { Link } from "react-router";

const Auth = ({ login }) => {
  return (
    <div className="auth-page">
      <div>
        <Logo center={true}/>
        <div className="auth-box">
          <div className="title">{login ? "Login" : "Sign-up"}</div>

          {
            login ? <Login/> : <SignUp/>
          }
          <div className="other-text">{login ? "Don’t have an account ?" : "Already have an account ?"}</div>

          <Link to={login ? "/sign-up": "/login"} >
            <button className="auth-btn last"> {login ? "Sign Up" : "Login"}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
Auth.propTypes = {
  login: PropTypes.bool.isRequired,
};
export default Auth;

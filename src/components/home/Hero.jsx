import { Link } from "react-router";
import Logo from "../Logo";
import Icon from "../Icon";
import Rate from "../../assets/rate.png";
import heroImg from "../../assets/hero.png";
import "../../styles/hero.scss";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 

const Hero = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <section className="hero-section">
      <div className="container">
        <nav>
          <Logo />

          <div className="btn-wrapper">
            <Link className="btn" to="sign-up">
              Get Started
            </Link>
            <Link className="btn" to="/login">
              <Icon icon="login" /> Login
            </Link>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="show-on-mobile"
            >
              <Icon icon="menu" />
            </button>

            {showMenu && (
              <div className="menu-card show-on-mobile">
                <div style={{ margin: "10px 0" }}>
                  <Link
                    onClick={() => setShowMenu(false)}
                    className="btn"
                    to="sign-up"
                  >
                    Get Started
                  </Link>
                </div>
                <Link
                  onClick={() => setShowMenu(false)}
                  className="btn"
                  to="/login"
                >
                  <Icon icon="login" /> Login
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="hero-content">
          <div className="write-up-section">
            <h1>Master Your Learning with StudyNest!</h1>
            <p>
              Access structured courses, recommended learning paths, and
              downloadable course modules – all in one place.
            </p>

            <div className="circle-and-rate">
              <div className="circle-container">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
              <img src={Rate} alt="rate" />
            </div>
          </div>

          <div className="right-side hide-on-mobile">
            <div className="white-box ">
              <div className="box">
                <Icon icon="calendar" />
              </div>
              <div>
                <div className="twok">250k</div>
                <div className="asst-stud">Assisted Student</div>
              </div>
            </div>

            <img className="hero-image" src={heroImg} alt="" />
            <div className="purple-box">
              <div className="inner">
                <Icon icon="threeLine" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

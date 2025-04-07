import { Link } from "react-router";
import SecImage from "../../assets/sec3.png"

const SectionThree = () => {
  return (
    <section className="section-three">
      <div className="container">
        <div className="section-three-card">
          <div className="header">Ready to Start Learning?</div>
          <div className="text">Join StudyNest Today – It’s Free!</div>

          <div className="btn-wrapper">
            <Link className="btn" to="/sign-up">
              Get started now
            </Link>
          </div>

            <img className="pic" src={SecImage} alt="man" />
        </div>
      </div>
    </section>
  );
};

export default SectionThree;

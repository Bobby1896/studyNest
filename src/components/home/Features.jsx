import React from "react";
import SectionHeader from "../SectionHeader";
import CardImg1 from "../../assets/cardImg1.png";
import CardImg2 from "../../assets/cardImg2.png";
import CardImg3 from "../../assets/cardImg3.png";
import { Link } from "react-router";
import "../../styles/features.scss";

const cardData = [
  {
    title: "Smart Learning Dashboad",
    content: "Get an overview of courses & recommendations.",
    image: CardImg1,
  },
  {
    title: "Downloadable Modules",
    content: "Access learning materials anytime.",
    image: CardImg2,
  },
  {
    title: "Personalized Learning Paths",
    content: "AI-powered course recommendations.",
    image: CardImg3,
  },
];

const Features = () => {
  return (
    <section className="features-section container">
      <SectionHeader title="Key Features" />
      <div className="card-wrapper">
        {cardData.map((info, key) => {
          return (
            <Link key={key}>
              <div className="card">
                <div
                  style={{ backgroundImage: `url(${info.image})` }}
                  className="card-img"
                ></div>
                <div className="card-body">
                  <div className="title">{info.title}</div>
                  <div className="content">{info.content}</div>
                </div>
              </div>{" "}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Features;

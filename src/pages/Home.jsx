import Features from "../components/home/Features"
import Footer from "../components/home/Footer"
import Hero from "../components/home/Hero"
import SectionThree from "../components/home/SectionThree"
import SectionTwo from "../components/home/SectionTwo"
import "../styles/home.scss"

const Home = () => {
  return (
    <div className="home-page">
        <Hero/>
        <Features />
        <SectionTwo/>
        <SectionThree/>
        <Footer/>
    </div>
  )
}

export default Home
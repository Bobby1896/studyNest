import SectionHeader from "../SectionHeader"


const SectionTwo = () => {
  return (
    <section className="section-two container">
        <SectionHeader title="How it works"/>

        <div className="card-wrapper">
            <div className="card">
                <div className="number">01</div>
                <div className="text">Sign up and set your learning preferences</div>
            </div>

            <div className="card">
                <div className="number">02</div>
                <div className="text">Explore recommended courses & download materials.</div>
            </div>

            <div className="card">
                <div className="number">03</div>
                <div className="text">Track your progress and achieve your learning goals!</div>
            </div>
        </div>
    </section>
  )
}

export default SectionTwo
import '../styles/about.css';

const About = () => {
  return (
    <>
      <div className="about-container">
        <h1 className="about-title">МЫ <span style={{ color: "#dc2626" }}>VINCERE MORTEM</span></h1>
        <p className="about-text">Основанная в 2025 году, VINCERE MORTEM стала доминирующей силой в мировом киберспорте. Наша миссия — не просто побеждать, а завоевывать сердца игроков.</p>
      </div>
      <div className="about-team-container">
        <div className="about-team-item">
          <h2 className="about-team-item-title">X</h2>
          <p className="about-team-item-text">ПОБЕД</p>
        </div>
        <div className="about-team-item">
          <h2 className="about-team-item-title">2K+</h2>
          <p className="about-team-item-text">ФАНАТОВ</p>
        </div>
        <div className="about-team-item">
          <h2 className="about-team-item-title">1</h2>
          <p className="about-team-item-text">ДИСЦИПЛИНА</p>
        </div>
        <div className="about-team-item">
          <h2 className="about-team-item-title">X</h2>
          <p className="about-team-item-text">ПРИЗОВЫХ</p>
        </div>
      </div>
      <div className="about-philosophy-container">
        <h2 className="about-team-item-title">НАША ФИЛОСОФИЯ</h2>
        <p className="about-text">Vincere Mortem — это не просто киберспортивная организация.
          Это система, построенная вокруг идеи постоянного роста, дисциплины и ответственности за результат.
          Мы верим, что победа — это не случайность и не вспышка формы.
          Это результат структуры, ежедневной работы и правильного окружения.
          <br /><br /></p>
          <img src="/about.png" alt="about philosophy" className="about-image" />
      </div>
    </>
  );
};

export default About;


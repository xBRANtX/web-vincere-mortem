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
          <h2 className="about-team-item-title">0</h2>
          <p className="about-team-item-text">ПОБЕД</p>
        </div>
        <div className="about-team-item">
          <h2 className="about-team-item-title">1</h2>
          <p className="about-team-item-text">ФАНАТОВ</p>
        </div>
        <div className="about-team-item">
          <h2 className="about-team-item-title">1</h2>
          <p className="about-team-item-text">ДИСЦИПЛИН</p>
        </div>
        <div className="about-team-item">
          <h2 className="about-team-item-title">$0</h2>
          <p className="about-team-item-text">ПРИЗОВЫХ</p>
        </div>
      </div>
      <div className="about-philosophy-container">
        <h2 className="about-team-item-title">НАША ФИЛОСОФИЯ</h2>
        <p className="about-text">Мы верим, что киберспорт — это больше, чем просто игра. Это дисциплина, командная работа и 
          постоянное стремление к совершенству. Наши игроки тренируются так же усердно, как и 
          традиционные спортсмены, и мы предоставляем им все условия для достижения вершин. <br /><br />
          VINCERE MORTEM - это семья. Мы поддерживаем наших игроков, создателей контента и фанатов, 
          создавая инклюзивное сообщество, объединенное страстью к играм.</p>
          <img src={`${import.meta.env.BASE_URL}/about.png`} alt="about philosophy" className="about-image" />
      </div>
    </>
  );
};

export default About;


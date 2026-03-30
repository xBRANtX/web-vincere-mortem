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
          Это результат структуры, ежедневной работы и правильного окружения.<br /><br />
          Наша философия строится на трёх принципах:<br /><br />
          Структура<br /><br />
          Мы создаём среду, в которой каждый игрок, тренер и участник команды понимает свою роль.
          Чёткие процессы, дисциплина и организация — основа стабильного результата.<br /><br />
          Развитие<br /><br />
          Мы работаем не только с текущим уровнем игроков, но и с их потенциалом.
          Наша задача — не просто выигрывать сегодня, а формировать составы, способные конкурировать на международной сцене в долгосрочной перспективе.<br /><br />
          Ответственность<br /><br />
          Каждый участник Vincere Mortem несёт ответственность за результат — перед командой, организацией и аудиторией.
          Мы ценим профессиональный подход, уважение и умение держать уровень вне зависимости от обстоятельств.<br /><br />
          Мы развиваем не только составы, но и экосистему вокруг них:
          турниры, медийные форматы, аналитические инструменты и платформы для роста игроков.
          Vincere Mortem — это путь.
          Путь от потенциала к результату.
          </p>
          <img src="/about.png" alt="about philosophy" className="about-image" />
      </div>
    </>
  );
};

export default About;


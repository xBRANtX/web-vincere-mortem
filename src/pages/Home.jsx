import { Link } from 'react-router-dom';
import '../styles/home.css';
import { scrollToTop } from '../utils/scrollToTop';

const Home = ({ news, matches }) => {
  const latestNews = news && news.length > 0 ? news.slice(0, 5) : [];
  const featuredNews = latestNews.length > 0 ? latestNews[0] : null;
  const otherNews = latestNews.length > 1 ? latestNews.slice(1) : [];

  const getNewsIndex = (newsItem) => {
    return news ? news.findIndex(item => item === newsItem) : -1;
  };

  const upcomingMatches = matches && matches.length > 0 
    ? matches.filter(match => !match.score || match.status === 'upcoming').slice(0, 5)
    : [];

  const nextMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : null;
  const scheduleMatches = upcomingMatches.length > 0 ? upcomingMatches : [];

  return (
    <div className='home-container'>
      <div className="home-header">
        <h1 className="home-title">ПОСЛЕДНИЕ <span style={{ color: "#dc2626" }}>НОВОСТИ</span></h1>
        <Link to="/news" className="all-news-button" onClick={scrollToTop}>
          ВСЕ НОВОСТИ
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
      
      {latestNews.length > 0 && (
        <section className="home-news">
          {featuredNews && (
            <Link 
              to={`/news/${getNewsIndex(featuredNews)}`} 
              className="featured-news-link"
            >
              <article className="featured-news">
                {featuredNews.thumbnail && (
                  <div className="featured-image-wrapper">
                    <img src={featuredNews.thumbnail} alt={featuredNews.title} className="featured-image" />
                    <div className="featured-content-overlay">
                      {featuredNews.category && (
                        <span className="news-tag">{featuredNews.category}</span>
                      )}
                      <h2>{featuredNews.title}</h2>
                      <small>{new Date(featuredNews.date).toLocaleDateString()}</small>
                    </div>
                  </div>
                )}
              </article>
            </Link>
          )}

          {otherNews.length > 0 && (
            <div className="news-grid">
              {otherNews.map((item, index) => {
                const newsIndex = getNewsIndex(item);
                return (
                  <Link 
                    key={index} 
                    to={`/news/${newsIndex}`}
                    className="news-card-link"
                  >
                    <article className="news-card">
                      {item.thumbnail && (
                        <div className="news-image-wrapper-main">
                          <img src={item.thumbnail} alt={item.title} className="news-image" />
                          <div className="news-content-overlay">
                            {item.category && (
                              <span className="news-tag">{item.category}</span>
                            )}
                            <h3>{item.title}</h3>
                            <small>{new Date(item.date).toLocaleDateString()}</small>
                          </div>
                        </div>
                      )}
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      )}

      <section className="popular-products-section">
        <div className="popular-products-container">
          <h2 className="popular-products-title">ПОПУЛЯРНЫЕ <span style={{ color: "#dc2626" }}>ТОВАРЫ</span></h2>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image-placeholder">
                <span>Товар 1</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">Название товара 1</h3>
                <p className="product-price">Цена товара</p>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image-placeholder">
                <span>Товар 2</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">Название товара 2</h3>
                <p className="product-price">Цена товара</p>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image-placeholder">
                <span>Товар 3</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">Название товара 3</h3>
                <p className="product-price">Цена товара</p>
              </div>
            </div>
          </div>
          <div className="products-button-wrapper">
            <button className="products-view-more-button" onClick={scrollToTop}>СМОТРЕТЬ ЕЩЕ</button>
          </div>
        </div>
      </section>

      <section className="matches-section">
        <div className="matches-container">
          <div className="matches-layout">
            <div className="matches-schedule">
              <h2 className="matches-title">РАСПИСАНИЕ <span style={{ color: "#dc2626" }}>МАТЧЕЙ</span></h2>
              {scheduleMatches.length > 0 ? (
                <div className="schedule-list">
                  {scheduleMatches.map((match, index) => {
                    const isPubgMobile = match.discipline === "PUBG MOBILE";
                    return (
                      <div key={index} className="schedule-item">
                        <div className="schedule-match-info">
                          <div className="schedule-logos">
                            <div className="schedule-logo-circle">
                              <img src="/vim.png" alt="Наша команда" className="schedule-logo" />
                            </div>
                            {!isPubgMobile && (
                              <>
                                <span className="schedule-vs">VS</span>
                                {match.logo && (
                                  <div className="schedule-logo-circle">
                                    <img src={match.logo} alt={match.opponent} className="schedule-logo" />
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                          <div className="schedule-details">
                            <h3 className="schedule-opponent">{isPubgMobile ? match.tournament : match.opponent}</h3>
                            <p className="schedule-discipline-tournament">
                              {match.discipline && (
                                <>
                                  {match.discipline}
                                  {match.ourTeamName && ` • ${match.ourTeamName}`}
                                  {!isPubgMobile && match.tournament && ` • ${match.tournament}`}
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      <div className="schedule-datetime">
                        <p className="schedule-date-text">
                          {new Date(match.date).toLocaleDateString('ru-RU', { 
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }).replace(/\//g, '.')}
                        </p>
                        <p className="schedule-time-text">
                          {new Date(match.date).toLocaleTimeString('ru-RU', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                    );
                  })}
                </div>
              ) : (
                <p className="no-matches">Матчей пока нет</p>
              )}
              <Link to="/matches" className="full-schedule-button" onClick={scrollToTop}>
                ПОЛНОЕ РАСПИСАНИЕ
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <div className="next-match">
              <h2 className="next-match-title">NEXT <span style={{ color: "#dc2626" }}>MATCH</span></h2>
              {nextMatch ? (() => {
                const isPubgMobile = nextMatch.discipline === "PUBG MOBILE";
                return (
                  <div className="next-match-card">
                    <div className={`next-match-teams ${isPubgMobile ? 'next-match-teams-vertical' : ''}`}>
                      <div className="next-match-team">
                        <div className="next-match-logo-circle">
                          <img src="/vim.png" alt="Наша команда" className="next-match-logo" />
                        </div>
                        <span className="next-match-team-name">{nextMatch.ourTeamName}</span>
                      </div>
                      {!isPubgMobile && (
                        <div className="next-match-vs">
                          <span className="next-match-vs-text">VS</span>
                          {nextMatch.discipline && (
                            <span className="next-match-discipline">{nextMatch.discipline}</span>
                          )}
                        </div>
                      )}
                      {isPubgMobile && nextMatch.discipline && (
                        <div className="next-match-vs">
                          <span className="next-match-discipline">{nextMatch.discipline}</span>
                        </div>
                      )}
                      <div className="next-match-team">
                        {!isPubgMobile && nextMatch.logo && (
                          <div className="next-match-logo-circle">
                            <img src={nextMatch.logo} alt={nextMatch.opponent} className="next-match-logo" />
                          </div>
                        )}
                        <span className={isPubgMobile ? "next-match-tournament" : "next-match-team-name"}>{isPubgMobile ? nextMatch.tournament : nextMatch.opponent}</span>
                      </div>
                    </div>
                    <div className="next-match-content">
                      {!isPubgMobile && (
                        <p className="next-match-tournament">{nextMatch.tournament}</p>
                      )}
                    <p className="next-match-datetime">
                      {new Date(nextMatch.date).toLocaleDateString('ru-RU', { 
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).replace(/\//g, '.')} • {new Date(nextMatch.date).toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {nextMatch.venue && (
                      <p className="next-match-venue">{nextMatch.venue}</p>
                    )}
                    {nextMatch.stream && (
                      <a href={nextMatch.stream} target="_blank" rel="noopener noreferrer" className="next-match-stream">
                        Смотреть трансляцию
                      </a>
                    )}
                    </div>
                  </div>
                );
              })() : (
                <p className="no-matches">Следующих матчей нет</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="sponsors-section">
        <div className="sponsors-container">
          <div className="sponsors-list">
            <div className="sponsor-item">LITENERGY</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


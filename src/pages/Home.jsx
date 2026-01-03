import { Link } from 'react-router-dom';
import '../styles/app.css';

const Home = ({ news }) => {
  const latestNews = news && news.length > 0 ? news.slice(0, 4) : [];
  const featuredNews = latestNews.length > 0 ? latestNews[0] : null;
  const otherNews = latestNews.length > 1 ? latestNews.slice(1) : [];

  return (
    <div className='home-container'>
      <h1 className="home-title">VINCERE MORTEM</h1>
      
      {latestNews.length > 0 && (
        <section className="home-news">
          {featuredNews && (
            <article className="featured-news">
              {featuredNews.thumbnail && (
                <img src={featuredNews.thumbnail} alt={featuredNews.title} className="featured-image" />
              )}
              <div className="featured-content">
                <h2>{featuredNews.title}</h2>
                <small>{new Date(featuredNews.date).toLocaleDateString()}</small>
                <p>{featuredNews.body}</p>
              </div>
            </article>
          )}

          {otherNews.length > 0 && (
            <div className="news-grid">
              {otherNews.map((item, index) => (
                <article key={index} className="news-card">
                  {item.thumbnail && (
                    <img src={item.thumbnail} alt={item.title} className="news-image" />
                  )}
                  <h3>{item.title}</h3>
                  <small>{new Date(item.date).toLocaleDateString()}</small>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;


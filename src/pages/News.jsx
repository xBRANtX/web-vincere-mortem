import '../styles/App.css';

const News = ({ news }) => {
  return (
    <div>
      <h1>Новости</h1>
      <div className="news-grid">
        {news && news.length > 0 ? (
          news.map((item, index) => (
            <article key={index} style={{ border: '1px solid #333', margin: '10px 0', padding: '10px' }}>
              {item.thumbnail && <img src={item.thumbnail} alt={item.title} width="200" />}
              <h2>{item.title}</h2>
              <small>{new Date(item.date).toLocaleDateString()}</small>
              <p>{item.body}</p> 
            </article>
          ))
        ) : (
          <p>Новостей пока нет</p>
        )}
      </div>
    </div>
  );
};

export default News;


import { useState, useEffect } from 'react'

function App() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const modules = import.meta.glob('./content/news/*.json', { eager: true })
    const newsArray = Object.values(modules).map((mod) => mod.default)
    newsArray.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    setNews(newsArray)
  }, [])

  return (
    <>
    <div style={{ padding: '20px' }}>
      <h1>Новости</h1>
      <div className="news-grid">
        {news.map((item, index) => (
          <article key={index} style={{ border: '1px solid #333', margin: '10px 0', padding: '10px' }}>
            {item.thumbnail && <img src={item.thumbnail} alt={item.title} width="200" />}
            <h2>{item.title}</h2>
            <small>{new Date(item.date).toLocaleDateString()}</small>
            <p>{item.body}</p> 
          </article>
        ))}
      </div>
    </div>
    </>
  )
}

export default App

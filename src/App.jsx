import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'

import './styles/app.css'
import './assets/fonts/stylesheet.css' 

import Layout from './components/Layout';
import Home from './pages/Home';
import News from './pages/News';
import About from './pages/About';

function App() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const modules = import.meta.glob('./content/news/*.json', { eager: true })
    const newsArray = Object.values(modules).map((mod) => mod.default)
    newsArray.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    setNews(newsArray)
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home news={news} />} />
        <Route path="news" element={<News news={news} />} />
        <Route path="teams" element={<div><h1>Команды</h1><p>Страница команд</p></div>} />
        <Route path="shop" element={<div><h1>Магазин</h1><p>Страница магазина</p></div>} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App

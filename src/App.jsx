import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'

import './assets/fonts/stylesheet.css' 

import Layout from './components/Layout';
import Home from './pages/Home';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import About from './pages/About';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import { createNewsSlugMap } from './utils/newsSlug';
import { NewsProvider } from './contexts/NewsContext';

function App() {
  const [news, setNews] = useState([])
  const [publicNews, setPublicNews] = useState([])
  const [newsSlugMap, setNewsSlugMap] = useState({})
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const modules = import.meta.glob('./content/news/*.json', { eager: true })
    const newsArray = Object.values(modules).map((mod) => mod.default)
    
    const currentDate = new Date()
    const publishedNews = newsArray.filter(item => {
      const newsDate = new Date(item.date)
      return newsDate <= currentDate
    })
    
    publishedNews.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    const publicNewsArray = publishedNews.filter(item => item.category !== 'CONTENT')
    const allNewsMap = createNewsSlugMap(modules)
    
    const publishedNewsMap = {}
    Object.entries(allNewsMap).forEach(([slug, newsItem]) => {
      const newsDate = new Date(newsItem.date)
      if (newsDate <= currentDate) {
        publishedNewsMap[slug] = newsItem
      }
    })
    
    setNews(publishedNews)
    setPublicNews(publicNewsArray)
    setNewsSlugMap(publishedNewsMap)
  }, [])

  useEffect(() => {
    const modules = import.meta.glob('./content/matches/*.json', { eager: true })
    const matchesArray = Object.values(modules).map((mod) => mod.default)
    matchesArray.sort((a, b) => new Date(a.date) - new Date(b.date))
    
    setMatches(matchesArray)
  }, [])

  useEffect(() => {
    const modules = import.meta.glob('./content/teams/*.json', { eager: true })
    const teamsArray = Object.values(modules).map((mod) => mod.default)
    
    setTeams(teamsArray)
  }, [])

  return (
    <NewsProvider publicNews={publicNews}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home news={publicNews} matches={matches} newsSlugMap={newsSlugMap} />} />
          <Route path="news" element={<News news={publicNews} newsSlugMap={newsSlugMap} />} />
          <Route path="news/:slug" element={<NewsDetail news={news} publicNews={publicNews} newsSlugMap={newsSlugMap} />} />
          <Route path="matches" element={<Matches matches={matches} />} />
          <Route path="teams" element={<Teams teams={teams} />} />
          <Route path="teams/:id" element={<TeamDetail teams={teams} />} />
          <Route path="shop" element={<div><h1>Магазин</h1><p>Страница магазина</p></div>} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </NewsProvider>
  )
}

export default App

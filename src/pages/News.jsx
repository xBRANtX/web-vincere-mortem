import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/news.css';
import { scrollToTop } from '../utils/scrollToTop';

const News = ({ news, newsSlugMap }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const newsPerPage = 12;
  const maxVisiblePages = 5;

  const categories = useMemo(() => {
    if (!news || news.length === 0) return [];
    const uniqueCategories = [...new Set(news.map(item => item.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [news]);

  const filteredNews = useMemo(() => {
    if (!news || news.length === 0) return [];
    if (selectedCategory === 'all') return news;
    return news.filter(item => item.category === selectedCategory);
  }, [news, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    scrollToTop();
  };

  const totalPages = filteredNews && filteredNews.length > 0 ? Math.ceil(filteredNews.length / newsPerPage) : 0;
  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const paginatedNews = filteredNews && filteredNews.length > 0 && filteredNews.length > newsPerPage
    ? filteredNews.slice(startIndex, endIndex)
    : filteredNews;

  const getVisiblePages = (current, total) => {
    if (total <= maxVisiblePages) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let startPage, endPage;

    if (current <= 3) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (current >= total - 2) {
      startPage = total - maxVisiblePages + 1;
      endPage = total;
    } else {
      startPage = current - 2;
      endPage = current + 2;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="news-container">
      <h1 className="news-title">ВСЕ <span style={{ color: "#dc2626" }}>НОВОСТИ</span></h1>
      
      {categories.length > 0 && (
        <div className="news-filters">
          <button
            className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            Все
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="news-grid news-grid-three">
        {paginatedNews && paginatedNews.length > 0 ? (
          paginatedNews.map((item, index) => {
            const slug = Object.keys(newsSlugMap).find(key => newsSlugMap[key] === item);
            
            return (
              <Link 
                key={slug || index} 
                to={`/news/${slug}`}
                className="news-card-link"
              >
                <article className="news-card">
                  {item.thumbnail && (
                    <div className="news-image-wrapper">
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
          })
        ) : (
          <p className="no-news">Новостей пока нет</p>
        )}
      </div>
      {filteredNews && filteredNews.length > newsPerPage && (
        <div className="pagination">
          <button 
            className="pagination-button"
            onClick={() => {
              setCurrentPage(prev => Math.max(1, prev - 1));
            }}
            disabled={currentPage === 1}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="pagination-numbers">
            {visiblePages.map((pageNum) => (
              <button
                key={pageNum}
                className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage(pageNum);
                }}
              >
                {pageNum}
              </button>
            ))}
          </div>
          <button 
            className="pagination-button"
            onClick={() => {
              setCurrentPage(prev => Math.min(totalPages, prev + 1));
            }}
            disabled={currentPage === totalPages}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default News;


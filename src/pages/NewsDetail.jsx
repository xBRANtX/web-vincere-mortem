import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import '../styles/newsDetail.css';
import { scrollToTop } from '../utils/scrollToTop';

const NewsDetail = ({ news, publicNews, newsSlugMap }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  
  let newsItem = null;
  
  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShowNotification(true);
    });
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);
  
  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(newsItem?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };
  
  if (slug && newsSlugMap) {
    newsItem = newsSlugMap[slug] || null;
  }

  if (!newsItem) {
    return (
      <div className="news-detail-not-found">
        <h1>НОВОСТЬ <span style={{ color: "#dc2626" }}>НЕ НАЙДЕНА</span></h1>
        <Link to="/news" onClick={scrollToTop} className="news-detail-not-found-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          ВЕРНУТЬСЯ К НОВОСТЯМ
        </Link>
      </div>
    );
  }

  return (
    <>
      {showNotification && (
        <div className="copy-notification">
          Ссылка скопирована
        </div>
      )}
      <div className="news-detail-container">
        <article className="news-detail">
        {newsItem.thumbnail ? (
          <div className="news-detail-header">
            <div className="news-detail-image-wrapper">
              <img 
                src={newsItem.thumbnail}
                alt={newsItem.title} 
                className="news-detail-image" 
              />
              <div className="news-detail-image-overlay">
                <div className="news-detail-overlay-content">
                  <a onClick={() => {
                    navigate('/news');
                    scrollToTop();
                  }} className="back-button-news-detail">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    ВСЕ НОВОСТИ
                  </a>
                  <div className="news-detail-meta">
                    {newsItem.category && (
                      <span className="news-detail-tag">{newsItem.category}</span>
                    )}
                    <small>{new Date(newsItem.date).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).replace(/\//g, '.')}</small>
                  </div>
                  <h1>{newsItem.title}</h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <a onClick={() => {
              navigate(-1);
              scrollToTop();
            }} className="back-button-news-detail back-button-no-image">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              НАЗАД К НОВОСТЯМ
            </a>
            <div className="news-detail-header-no-image">
              <div className="news-detail-meta">
                {newsItem.category && (
                  <span className="news-detail-tag">{newsItem.category}</span>
                )}
                <small>{new Date(newsItem.date).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).replace(/\//g, '.')}</small>
              </div>
              <h1>{newsItem.title}</h1>
            </div>
          </>
        )}
        <div className="news-detail-content">
          <div className="news-detail-body">
            <div className="news-detail-share">
              <span className="news-detail-share-text">ПОДЕЛИТЬСЯ:</span>
              <button onClick={copyLink} className="news-detail-share-button" title="Копировать ссылку">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6466 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.47L11.75 5.18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11C13.5705 10.4259 13.0226 9.95085 12.3934 9.60707C11.7643 9.26329 11.0685 9.05886 10.3534 9.00766C9.63821 8.95645 8.92038 9.05972 8.24865 9.31026C7.57692 9.5608 6.96688 9.95304 6.46 10.46L3.46 13.46C2.54918 14.403 2.04519 15.6661 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.44791 21.3962 5.70198 21.922 7.01296 21.9334C8.32394 21.9448 9.58695 21.4408 10.53 20.53L12.24 18.82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button onClick={shareOnTwitter} className="news-detail-share-button" title="Поделиться в X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {newsItem.body}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
    </>
  );
};

export default NewsDetail;


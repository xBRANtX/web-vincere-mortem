import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';
import { scrollToTop } from '../utils/scrollToTop';
import { useNews } from '../contexts/NewsContext';

const Header = () => {
  const { publicNews } = useNews();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('RUS');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageDropdownRef = useRef(null);
  const searchContainerRef = useRef(null);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !publicNews || publicNews.length === 0) {
      return [];
    }
    const query = searchQuery.toLowerCase().trim();
    return publicNews.filter(newsItem => 
      newsItem.title?.toLowerCase().includes(query) ||
      newsItem.body?.toLowerCase().includes(query) ||
      newsItem.category?.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery, publicNews]);

  const handleResultClick = (newsItem) => {
    const index = publicNews.findIndex(item => item === newsItem);
    if (index !== -1) {
      navigate(`/news/${index}`);
      handleSearchClose();
      scrollToTop();
    }
  };

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleLanguageSelect = (lang) => {
    setCurrentLanguage(lang);
    setIsLanguageOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    scrollToTop();
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.querySelector('.mobile-menu');
      const hamburgerButton = document.querySelector('.hamburger-menu');
      
      if (
        isMobileMenuOpen &&
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        hamburgerButton &&
        !hamburgerButton.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <nav className="main-nav">
        <div className="nav-container">
          {!isSearchOpen ? (
            <>
              <div className="nav-logo-section">
                <Link to="/" className="nav-logo" onClick={scrollToTop}>
                  <img src={`${import.meta.env.BASE_URL}/vim.png`} alt="Логотип" className="logo-img" />
                  <span className="nav-brand"><span style={{ color: '#dc2626' }}>VINCERE</span><span className="nav-brand-part">MORTEM</span></span>
                </Link>
              </div>
              <div className="nav-links-section">
                <Link to="/news" className="nav-link" onClick={scrollToTop}>НОВОСТИ</Link>
                <Link to="/matches" className="nav-link" onClick={scrollToTop}>МАТЧИ</Link>
                <Link to="/teams" className="nav-link" onClick={scrollToTop}>КОМАНДЫ</Link>
                <Link to="/shop" className="nav-link" onClick={scrollToTop}>МАГАЗИН</Link>
                <Link to="/about" className="nav-link" onClick={scrollToTop}>О КЛУБЕ</Link>
              </div>
              <div className="nav-actions-section">
                <button 
                  className="search-button" 
                  onClick={() => {
                    handleSearchClick();
                    scrollToTop();
                  }}
                  aria-label="Поиск"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
                  onClick={handleMobileMenuToggle}
                  aria-label="Меню"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
              <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                  <Link to="/news" className="mobile-nav-link" onClick={handleMobileLinkClick}>НОВОСТИ</Link>
                  <Link to="/matches" className="mobile-nav-link" onClick={handleMobileLinkClick}>МАТЧИ</Link>
                  <Link to="/teams" className="mobile-nav-link" onClick={handleMobileLinkClick}>КОМАНДЫ</Link>
                  <Link to="/shop" className="mobile-nav-link" onClick={handleMobileLinkClick}>МАГАЗИН</Link>
                  <Link to="/about" className="mobile-nav-link" onClick={handleMobileLinkClick}>О КЛУБЕ</Link>
                </div>
              </div>
            </>
          ) : (
            <div className="search-wrapper" ref={searchContainerRef}>
              <div className="search-container">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Поиск по новостям..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  className="search-close-button" 
                  onClick={() => {
                    handleSearchClose();
                    scrollToTop();
                  }}
                  aria-label="Закрыть поиск"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              {searchQuery.trim() && searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((newsItem, index) => {
                    const newsIndex = publicNews.findIndex(item => item === newsItem);
                    return (
                      <div
                        key={index}
                        className="search-result-item"
                        onClick={() => handleResultClick(newsItem)}
                      >
                        {newsItem.thumbnail && (
                          <img src={newsItem.thumbnail} alt={newsItem.title} className="search-result-image" />
                        )}
                        <div className="search-result-content">
                          <h4 className="search-result-title">{newsItem.title}</h4>
                          {newsItem.category && (
                            <span className="search-result-category">{newsItem.category}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="search-results">
                  <div className="search-result-empty">Ничего не найдено</div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;


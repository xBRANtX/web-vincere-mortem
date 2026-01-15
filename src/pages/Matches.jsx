import { useState } from 'react';
import '../styles/matches.css';
import { scrollToTop } from '../utils/scrollToTop';

const Matches = ({ matches }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePlayed, setCurrentPagePlayed] = useState(1);
  const matchesPerPage = 3;
  const maxVisiblePages = 5;

  const upcomingMatches = matches && matches.length > 0 
    ? matches.filter(match => !match.score || match.status === 'upcoming')
    : [];
  
  const playedMatches = matches && matches.length > 0 
    ? matches.filter(match => match.score && match.status !== 'upcoming')
    : [];

  const totalPages = Math.ceil(upcomingMatches.length / matchesPerPage);
  const startIndex = (currentPage - 1) * matchesPerPage;
  const endIndex = startIndex + matchesPerPage;
  const paginatedUpcomingMatches = upcomingMatches.length > matchesPerPage 
    ? upcomingMatches.slice(startIndex, endIndex)
    : upcomingMatches;

  const totalPagesPlayed = Math.ceil(playedMatches.length / matchesPerPage);
  const startIndexPlayed = (currentPagePlayed - 1) * matchesPerPage;
  const endIndexPlayed = startIndexPlayed + matchesPerPage;
  const paginatedPlayedMatches = playedMatches.length > matchesPerPage 
    ? playedMatches.slice(startIndexPlayed, endIndexPlayed)
    : playedMatches;

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
  const visiblePagesPlayed = getVisiblePages(currentPagePlayed, totalPagesPlayed);

  return (
    <div className="matches-page-container">
      <h1 className="matches-page-title">РАСПИСАНИЕ <span style={{ color: "#dc2626" }}>МАТЧЕЙ</span></h1>
      
      {upcomingMatches.length > 0 && (
        <section className="matches-section-upcoming">
          <h2 className="matches-section-title">ПРЕДСТОЯЩИЕ МАТЧИ</h2>
          <div className="matches-list">
            {paginatedUpcomingMatches.map((match, index) => (
              <div key={index} className="match-card">
                <div className="match-card-content">
                  <div className="match-teams">
                    <div className="match-team">
                      <div className="match-logo-circle">
                        <img src={`${import.meta.env.BASE_URL}/vim.png`} alt="Наша команда" className="match-logo" />
                      </div>
                      <span className="match-team-name">VIM</span>
                    </div>
                    <div className="match-vs">
                      <span className="match-vs-text">VS</span>
                      {match.discipline && (
                        <span className="match-discipline">{match.discipline}</span>
                      )}
                    </div>
                    <div className="match-team">
                      {match.logo && (
                        <div className="match-logo-circle">
                          <img src={`${import.meta.env.BASE_URL}/${match.logo}`} alt={match.opponent} className="match-logo" />
                        </div>
                      )}
                      <span className="match-team-name">{match.opponent}</span>
                    </div>
                  </div>
                  <div className="match-info">
                    <p className="match-tournament">{match.tournament}</p>
                    <p className="match-datetime">
                      {new Date(match.date).toLocaleDateString('ru-RU', { 
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).replace(/\//g, '.')} • {new Date(match.date).toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {match.venue && (
                      <p className="match-venue">{match.venue}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {upcomingMatches.length > matchesPerPage && (
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
        </section>
      )}

      {playedMatches.length > 0 && (
        <section className="matches-section-played">
          <h2 className="matches-section-title">СЫГРАННЫЕ МАТЧИ</h2>
          <div className="matches-list">
            {paginatedPlayedMatches.map((match, index) => (
              <div key={index} className="match-card match-card-played">
                <div className="match-card-content">
                  <div className="match-teams">
                    <div className="match-team">
                      <div className="match-logo-circle">
                        <img src={`${import.meta.env.BASE_URL}/vim.png`} alt="Наша команда" className="match-logo" />
                      </div>
                      <span className="match-team-name">VIM</span>
                      {match.score && (
                        <span className="match-score">{match.score.split(':')[0]}</span>
                      )}
                    </div>
                    <div className="match-vs">
                      <span className="match-vs-text">VS</span>
                      {match.discipline && (
                        <span className="match-discipline">{match.discipline}</span>
                      )}
                    </div>
                    <div className="match-team">
                      {match.logo && (
                        <div className="match-logo-circle">
                          <img src={`${import.meta.env.BASE_URL}/${match.logo}`} alt={match.opponent} className="match-logo" />
                        </div>
                      )}
                      <span className="match-team-name">{match.opponent}</span>
                      {match.score && (
                        <span className="match-score">{match.score.split(':')[1]}</span>
                      )}
                    </div>
                  </div>
                  <div className="match-info">
                    <p className="match-tournament">{match.tournament}</p>
                    <p className="match-datetime">
                      {new Date(match.date).toLocaleDateString('ru-RU', { 
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).replace(/\//g, '.')} • {new Date(match.date).toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {match.venue && (
                      <p className="match-venue">{match.venue}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {playedMatches.length > matchesPerPage && (
            <div className="pagination">
              <button 
                className="pagination-button"
                onClick={() => {
                  setCurrentPagePlayed(prev => Math.max(1, prev - 1));
                }}
                disabled={currentPagePlayed === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="pagination-numbers">
                {visiblePagesPlayed.map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`pagination-number ${currentPagePlayed === pageNum ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentPagePlayed(pageNum);
                    }}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              <button 
                className="pagination-button"
                onClick={() => {
                  setCurrentPagePlayed(prev => Math.min(totalPagesPlayed, prev + 1));
                }}
                disabled={currentPagePlayed === totalPagesPlayed}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </section>
      )}

      {upcomingMatches.length === 0 && playedMatches.length === 0 && (
        <p className="no-matches-message">Матчей пока нет</p>
      )}
    </div>
  );
};

export default Matches;

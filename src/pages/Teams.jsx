import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/teams.css';
import { scrollToTop } from '../utils/scrollToTop';

const Teams = ({ teams }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 6;

  const totalPages = Math.ceil((teams?.length || 0) / teamsPerPage);
  const startIndex = (currentPage - 1) * teamsPerPage;
  const endIndex = startIndex + teamsPerPage;
  const paginatedTeams = teams && teams.length > 0
    ? (teams.length > teamsPerPage 
        ? teams.slice(startIndex, endIndex)
        : teams)
    : [];

  return (
    <div className="teams-page-container">
      <h1 className="teams-page-title">НАШИ <span style={{ color: "#dc2626" }}>КОМАНДЫ</span></h1>
      <p className="teams-page-subtitle">Наши чемпионы</p>
      
      {paginatedTeams.length > 0 && (
        <section className="teams-section">
          <div className="teams-list">
            {paginatedTeams.map((team, index) => (
              <Link 
                key={index} 
                to={`/teams/${index}`} 
                className="team-card-link"
                onClick={scrollToTop}
              >
                <div className="team-card">
                {team.image && (
                  <div className="team-image-wrapper">
                    <img src={team.image} alt={team.name} className="team-image" />
                  </div>
                )}
                <div className="team-card-content">
                  <div className="team-header">
                    <h2 className="team-discipline-title">{team.discipline || 'Дисциплина'}</h2>
                    <p className="team-name">{team.name || 'Команда'}</p>
                  </div>
                  {team.players && team.players.length > 0 && (
                    <div className="team-players-avatars">
                      {team.players.slice(0, 5).map((player, playerIndex) => {
                        const playerNickname = typeof player === 'string' ? player : (player.nickname || player.name || 'Player');
                        const playerAvatar = typeof player === 'object' ? player.avatar : null;
                        return (
                          <div key={playerIndex} className="team-player-avatar">
                            {playerAvatar ? (
                              <img src={playerAvatar} alt={playerNickname} className="player-avatar-img" />
                            ) : (
                              <div className="player-avatar-placeholder">
                                {playerNickname.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="team-footer">
                    <span className="team-more-link">ПОДРОБНЕЕ О СОСТАВЕ</span>
                    {team.achievements && team.achievements.length > 0 && (
                      <div className="team-achievement-wrapper">
                        <svg className="team-trophy-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                          <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                          <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                          <path d="M4 22h16"></path>
                          <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                          <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                        </svg>
                        <span className="team-main-achievement">{team.achievements[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
          {teams && teams.length > teamsPerPage && (
            <div className="pagination">
              <button 
                className="pagination-button"
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  scrollToTop();
                }}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      scrollToTop();
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
                  scrollToTop();
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

      {(!teams || teams.length === 0) && (
        <p className="no-teams-message">Команд пока нет</p>
      )}
    </div>
  );
};

export default Teams;

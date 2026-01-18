import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/teamDetail.css';
import { scrollToTop } from '../utils/scrollToTop';

const TeamDetail = ({ teamSlugMap }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  
  const team = teamSlugMap && slug ? teamSlugMap[slug] : null;

  if (!team) {
    return (
      <div className="team-detail-not-found">
        <h1>КОМАНДА <span style={{ color: "#dc2626" }}>НЕ НАЙДЕНА</span></h1>
        <Link to="/teams" onClick={scrollToTop} className="team-detail-not-found-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          ВЕРНУТЬСЯ К КОМАНДАМ
        </Link>
      </div>
    );
  }

  return (
    <div className="team-detail-container">
      {team.image && (
        <div className="team-detail-header">
          <div className="team-detail-image-wrapper">
            <img src={team.image} alt={team.name} className="team-detail-image" />
            <div className="team-detail-image-overlay">
              <div className="team-detail-overlay-content">
                <a onClick={
                  () => {
                    navigate('/teams');
                    scrollToTop();
                  }
                } className="back-button-team-detail">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  НАЗАД К КОМАНДАМ
                </a>
                <h1 className="team-detail-title">{team.name || 'Команда'}</h1>
                <p className="team-detail-subtitle">{team.discipline || 'Дисциплина'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="team-detail-content">
        <div className="team-detail-main">
          <div className="team-detail-left">
            <section className="team-detail-section">
              <h2 className="team-detail-section-title" style={{ borderLeft: '3px solid #dc2626', paddingLeft: '10px'}}>СОСТАВ</h2>
              <div className="team-players-list">
                {team.players && team.players.length > 0 ? (
                  team.players.map((player, index) => {
                    const playerNickname = typeof player === 'string' ? player : (player.nickname || 'Player');
                    const playerFullName = typeof player === 'object' ? player.fullName : null;
                    const playerCountry = typeof player === 'object' ? player.country : null;
                    const playerRole = typeof player === 'object' ? player.role : null;
                    const playerAvatar = typeof player === 'object' ? player.avatar : null;
                    
                    return (
                      <div key={index} className="team-player-card">
                        <div className="team-player-avatar-large">
                          {playerAvatar ? (
                            <img src={playerAvatar} alt={playerNickname} className="player-avatar-img-large" />
                          ) : (
                            <div className="player-avatar-placeholder-large">
                              {playerNickname.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="team-player-info">
                          <h3 className="team-player-nickname">{playerNickname}</h3>
                          {playerFullName && (
                            <p className="team-player-fullname">{playerFullName}</p>
                          )}
                          <div className="team-player-details">
                            {playerRole && (
                              <span className="team-player-role">{playerRole}</span>
                            )}
                            {playerCountry && (
                              <span className="team-player-country">{playerCountry}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-players">Игроки не указаны</p>
                )}
              </div>
            </section>
          </div>

          <div className="team-detail-right">
            <section className="team-detail-section-right">
              <h2 className="team-detail-section-title">О КОМАНДЕ</h2>
              {team.description ? (
                <p className="team-detail-description">{team.description}</p>
              ) : (
                <p className="team-detail-description">Информация о команде отсутствует.</p>
              )}

              {team.achievements && team.achievements.length > 0 && (
                <div className="team-achievements-section">
                  <div className="team-achievements-header">
                    <svg className="team-trophy-icon-small" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                      <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                      <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                      <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                    </svg>
                    <h3 className="team-achievements-title">ДОСТИЖЕНИЯ</h3>
                  </div>
                  <ul className="team-achievements-list-detail">
                    {(showAllAchievements ? team.achievements : team.achievements.slice(0, 3)).map((achievement, index) => (
                      <li key={index} className="team-achievement-item">
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  {team.achievements.length > 3 && (
                    <button 
                      className="team-achievements-toggle"
                      onClick={() => setShowAllAchievements(!showAllAchievements)}
                      aria-label={showAllAchievements ? "Свернуть достижения" : "Показать все достижения"}
                    >
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ 
                          transform: showAllAchievements ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{showAllAchievements ? 'Свернуть' : `Показать еще ${team.achievements.length - 3}`}</span>
                    </button>
                  )}
                </div>
              )}
            </section>

            {team.seasonStats && (
              <section className="team-detail-section team-stats-section">
                <div className="team-stats-header">
                  <svg className="team-stats-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="22" x2="18" y1="12" y2="12"></line>
                      <line x1="6" x2="2" y1="12" y2="12"></line>
                      <line x1="12" x2="12" y1="6" y2="2"></line>
                      <line x1="12" x2="12" y1="22" y2="18"></line>
                  </svg>
                  <h2 className="team-detail-section-title"><span style={{ color: "#dc2626" }}>СТАТИСТИКА СЕЗОНА</span></h2>
                </div>
                <div className="team-stats-grid">
                  {Object.entries(team.seasonStats).map(([key, value]) => (
                    <div key={key} className="team-stat-item">
                      <span className="team-stat-value">{value}</span>
                      <span className="team-stat-label">{key}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;

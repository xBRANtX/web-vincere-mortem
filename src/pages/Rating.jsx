import { useState, useMemo, useEffect } from 'react';
import '../styles/rating.css';

const DEFAULT_DISCIPLINE = 'PUBG MOBILE';

const Rating = ({ ratingList }) => {
  const disciplines = useMemo(() => {
    if (!ratingList || ratingList.length === 0) return [];
    const sorted = [...ratingList].sort((a, b) => {
      if (a.discipline === DEFAULT_DISCIPLINE) return -1;
      if (b.discipline === DEFAULT_DISCIPLINE) return 1;
      return (a.discipline || '').localeCompare(b.discipline || '');
    });
    return sorted;
  }, [ratingList]);

  const defaultSelected = disciplines.find(d => d.discipline === DEFAULT_DISCIPLINE) || disciplines[0];
  const [selectedSlug, setSelectedSlug] = useState(defaultSelected?.slug ?? null);

  useEffect(() => {
    if (disciplines.length > 0 && (!selectedSlug || !disciplines.some(d => d.slug === selectedSlug))) {
      const slug = (disciplines.find(d => d.discipline === DEFAULT_DISCIPLINE) || disciplines[0])?.slug;
      setSelectedSlug(slug ?? null);
    }
  }, [disciplines, selectedSlug]);

  const current = useMemo(() => {
    if (!selectedSlug) return null;
    return ratingList?.find(r => r.slug === selectedSlug) || disciplines.find(d => d.slug === selectedSlug);
  }, [ratingList, selectedSlug, disciplines]);

  const players = current?.players ?? [];

  return (
    <div className="rating-page-container">
      <h1 className="rating-page-title">РЕЙТИНГ</h1>
      <p className="rating-page-subtitle">Топ игроков по дисциплинам</p>

      {disciplines.length > 0 && (
        <div className="rating-disciplines">
          {disciplines.map((item) => (
            <button
              key={item.slug}
              type="button"
              className={`rating-discipline-btn ${selectedSlug === item.slug ? 'active' : ''}`}
              onClick={() => setSelectedSlug(item.slug)}
            >
              {item.discipline}
            </button>
          ))}
        </div>
      )}

      <div className="rating-table-wrapper">
        <table className="rating-table">
          <thead>
            <tr>
              <th className="rating-col-top">ТОП</th>
              <th>Ник</th>
              <th>Команда</th>
              <th>Киллы</th>
              <th>Турниры</th>
              <th>Страна</th>
            </tr>
          </thead>
          <tbody>
            {players.length > 0 ? (
              players.map((player, index) => {
                const top = index + 1;
                const topClass = top === 1 ? 'rating-top-gold' : top === 2 ? 'rating-top-silver' : top === 3 ? 'rating-top-bronze' : '';
                return (
                  <tr key={index}>
                    <td className={`rating-col-top ${topClass}`}>{top}</td>
                    <td>{player.nickname ?? '—'}</td>
                    <td>{player.teamName ?? '—'}</td>
                    <td>{player.kills ?? 0}</td>
                    <td>{player.tournamentsPlayed ?? 0}</td>
                    <td>{player.country ?? '—'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="rating-table-empty">
                  {current ? 'В этой дисциплине пока нет записей' : 'Выберите дисциплину'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rating;

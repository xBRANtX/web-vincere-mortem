import '../styles/footer.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { scrollToTop } from '../utils/scrollToTop';

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowPrivacyModal(false);
        setShowTermsModal(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (showPrivacyModal || showTermsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showPrivacyModal, showTermsModal]);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <div className="footer-logo-section">
            <img src="/vim.png" alt="Логотип" className="logo-img" />
            <span className="nav-brand"><span style={{ color: '#dc2626' }}>VINCERE</span><span className="nav-brand-part">MORTEM</span></span>
          </div>
          <p className="footer-logo-text">Организация по множеству дисциплин, которая занимается продвижением нашего региона и комьюнити на высший и честный уровень.</p>
        </div>
        <div className="footer-links">
          <h3 className="footer-menu-title">МЕНЮ</h3>
          <ul className="footer-menu-list">
            <li><Link to="/" className="footer-link" onClick={scrollToTop}>Главная</Link></li>
            <li><Link to="/news" className="footer-link" onClick={scrollToTop}>Новости</Link></li>
            <li><Link to="/matches" className="footer-link" onClick={scrollToTop}>Матчи</Link></li>
            <li><Link to="/teams" className="footer-link" onClick={scrollToTop}>Команды</Link></li>
            <li><Link to="/rating" className="footer-link" onClick={scrollToTop}>Рейтинг</Link></li>
            {/* <li><Link to="/shop" className="footer-link" onClick={scrollToTop}>Магазин</Link></li> */}  
            <li><Link to="/about" className="footer-link" onClick={scrollToTop}>О клубе</Link></li>
          </ul>
        </div>
        <div className="footer-partners">
          <h3 className="footer-partners-title">ПАРТНЁРЫ</h3>
          <ul className="footer-partners-list">
            <li><a href="" className="footer-partners-link"></a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3 className="footer-social-title">СОЦСЕТИ</h3>
          <ul className="footer-social-list">
            <li><a href="https://t.me/vim_pubgm" className="footer-social-link">Telegram</a></li>
            <li><a href="https://discord.gg/wJwwqXsfsx" className="footer-social-link">Discord</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-content">
        <p className="footer-copyright">&copy; 2026 VINCERE MORTEM. Все права защищены.</p>
        <div className="footer-legal-links">
          <p className="footer-privacy-policy" onClick={() => setShowPrivacyModal(true)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setShowPrivacyModal(true)}>Политика конфиденциальности</p>
          <p className="footer-terms-of-service" onClick={() => setShowTermsModal(true)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setShowTermsModal(true)}>Условия использования</p>
        </div>
      </div>

      {/* Модальное окно: Политика конфиденциальности */}
      {showPrivacyModal && (
        <div className="footer-modal-overlay" onClick={() => setShowPrivacyModal(false)} role="dialog" aria-modal="true" aria-labelledby="privacy-modal-title">
          <div className="footer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="footer-modal-header">
              <h2 id="privacy-modal-title" className="footer-modal-title">Политика конфиденциальности</h2>
              <button type="button" className="footer-modal-close" onClick={() => setShowPrivacyModal(false)} aria-label="Закрыть">&times;</button>
            </div>
            <div className="footer-modal-body">
              <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта VINCERE MORTEM.</p>
              <h3>1. Сбор информации</h3>
              <p>Мы можем собирать информацию, которую вы предоставляете при использовании сайта, подписке на рассылку или обращении в поддержку.</p>
              <h3>2. Использование данных</h3>
              <p>Собранные данные используются для улучшения работы сайта, персонализации контента и связи с вами по вопросам деятельности организации.</p>
              <h3>3. Защита данных</h3>
              <p>Мы применяем технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа.</p>
              <h3>4. Контакты</h3>
              <p>По вопросам, связанным с обработкой персональных данных, вы можете связаться с нами через официальные каналы в Telegram или Discord.</p>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно: Условия использования */}
      {showTermsModal && (
        <div className="footer-modal-overlay" onClick={() => setShowTermsModal(false)} role="dialog" aria-modal="true" aria-labelledby="terms-modal-title">
          <div className="footer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="footer-modal-header">
              <h2 id="terms-modal-title" className="footer-modal-title">Условия использования</h2>
              <button type="button" className="footer-modal-close" onClick={() => setShowTermsModal(false)} aria-label="Закрыть">&times;</button>
            </div>
            <div className="footer-modal-body">
              <p>Используя сайт VINCERE MORTEM, вы соглашаетесь с настоящими Условиями использования.</p>
              <h3>1. Общие положения</h3>
              <p>Сайт предназначен для информирования о деятельности организации, турнирах и сообществе. Использование материалов сайта допускается с указанием источника.</p>
              <h3>2. Правила поведения</h3>
              <p>Пользователи обязуются соблюдать нормы этики при общении в комментариях и на связанных площадках. Запрещается распространение незаконного контента и оскорблений.</p>
              <h3>3. Интеллектуальная собственность</h3>
              <p>Логотипы, брендинг и контент сайта являются собственностью VINCERE MORTEM. Копирование и использование без разрешения не допускается.</p>
              <h3>4. Изменения</h3>
              <p>Мы оставляем за собой право вносить изменения в Условия использования. Актуальная версия всегда доступна на данной странице.</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;


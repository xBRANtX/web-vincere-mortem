import '../styles/footer.css';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollToTop';

const Footer = () => {

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <div className="footer-logo-section">
            <img src="/vim.png" alt="Логотип" className="logo-img" />
            <span className="nav-brand"><span style={{ color: '#dc2626' }}>VINCERE</span><span className="nav-brand-part">MORTEM</span></span>
          </div>
          <p className="footer-logo-text">ZXC</p>
        </div>
        <div className="footer-links">
          <h3 className="footer-menu-title">МЕНЮ</h3>
          <ul className="footer-menu-list">
            <li><Link to="/" className="footer-link" onClick={scrollToTop}>Главная</Link></li>
            <li><Link to="/news" className="footer-link" onClick={scrollToTop}>Новости</Link></li>
            <li><Link to="/matches" className="footer-link" onClick={scrollToTop}>Матчи</Link></li>
            <li><Link to="/teams" className="footer-link" onClick={scrollToTop}>Команды</Link></li>
            <li><Link to="/shop" className="footer-link" onClick={scrollToTop}>Магазин</Link></li>
            <li><Link to="/about" className="footer-link" onClick={scrollToTop}>О клубе</Link></li>
          </ul>
        </div>
        <div className="footer-partners">
          <h3 className="footer-partners-title">ПАРТНЁРЫ</h3>
          <ul className="footer-partners-list">
            <li><a href="" className="footer-partners-link">...</a></li>
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
          <p className="footer-privacy-policy">Политика конфиденциальности</p>
          <p className="footer-terms-of-service">Условия использования</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


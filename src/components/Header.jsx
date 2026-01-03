import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="sponsors-bar">
        <div className="sponsors-content">
          <span>СПОНСОР</span>
        </div>
      </div>

      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/news" className="nav-link">НОВОСТИ</Link>
          <Link to="/teams" className="nav-link">КОМАНДЫ</Link>
          <Link to="/" className="nav-logo">
            <img src="/vim.png" alt="Логотип" className="logo-img" />
          </Link>
          <Link to="/shop" className="nav-link">МАГАЗИН</Link>
          <Link to="/about" className="nav-link">О КЛУБЕ</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;


import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <header className="hy-header">
      <div className="container hy-nav">
        <Link to="/" className="hy-logo">
          <span>🚤</span>
          <div>
            <strong>Хочу Яхту</strong>
            <small>crypto collective</small>
          </div>
        </Link>
        <nav className={`hy-menu ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Головна
          </NavLink>
          <NavLink to="/blog" onClick={() => setIsOpen(false)}>
            Блог
          </NavLink>
          <NavLink to="/earn" onClick={() => setIsOpen(false)}>
            Earn
          </NavLink>
          <NavLink to="/launchpool" onClick={() => setIsOpen(false)}>
            Launchpool
          </NavLink>
          <div className="hy-menu-cta">
            <Link to="/earn" className="button">
              Приєднатись
            </Link>
            <ThemeToggle />
          </div>
        </nav>
        <button
          type="button"
          className="hy-burger"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;

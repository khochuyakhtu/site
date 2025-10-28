import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import { Resources } from '../resources/Resources.ts';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const {
    shared: { brand, navigation }
  } = Resources;

  return (
    <header className="hy-header">
      <div className="container hy-nav">
        <Link to="/" className="hy-logo">
          <span>{brand.emoji}</span>
          <div>
            <strong>{brand.name}</strong>
            <small>{brand.tagline}</small>
          </div>
        </Link>
        <nav className={`hy-menu ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            {navigation.home}
          </NavLink>
          <NavLink to="/blog" onClick={() => setIsOpen(false)}>
            {navigation.blog}
          </NavLink>
          <NavLink to="/earn" onClick={() => setIsOpen(false)}>
            {navigation.earn}
          </NavLink>
          <NavLink to="/launchpool" onClick={() => setIsOpen(false)}>
            {navigation.launchpool}
          </NavLink>
          <div className="hy-menu-cta">
            <Link to="/earn" className="button">
              {navigation.joinCta}
            </Link>
            <ThemeToggle />
          </div>
        </nav>
        <button
          type="button"
          className="hy-burger"
          aria-label={navigation.toggleAriaLabel}
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

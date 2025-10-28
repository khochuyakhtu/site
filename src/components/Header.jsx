import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import { Resources } from '../resources/Resources.ts';
import { clearUser } from '../slices/authSlice.js';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
            {!user ? (
              <Link to="/login" className="button secondary" onClick={() => setIsOpen(false)}>
                {navigation.login}
              </Link>
            ) : (
              <div className="hy-user-area">
                <Link to="/login" className="hy-user-chip" onClick={() => setIsOpen(false)}>
                  {user.photoUrl ? (
                    <img src={user.photoUrl} alt={user.firstName || user.username} />
                  ) : (
                    <span className="hy-user-initial">
                      {user.firstName?.[0] ?? user.username?.[0] ?? '🚤'}
                    </span>
                  )}
                  <span>
                    {[user.firstName, user.lastName].filter(Boolean).join(' ') ||
                      user.username ||
                      'Telegram'}
                  </span>
                </Link>
                <button
                  type="button"
                  className="hy-logout"
                  onClick={() => {
                    dispatch(clearUser());
                    setIsOpen(false);
                  }}
                >
                  {navigation.logout}
                </button>
              </div>
            )}
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

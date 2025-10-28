import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Resources } from '../resources/Resources.ts';
import { clearUser, setUser } from '../slices/authSlice.js';
import './LoginContainer.css';

const TELEGRAM_WIDGET_SRC = 'https://telegram.org/js/telegram-widget.js?22';
const TELEGRAM_CALLBACK_NAME = 'hochuYachtOnTelegramAuth';

const sanitizeUser = (user) => {
  if (!user || !user.id) {
    return null;
  }

  return {
    id: user.id,
    firstName: user.first_name ?? '',
    lastName: user.last_name ?? '',
    username: user.username ?? '',
    photoUrl: user.photo_url ?? '',
    authDate: user.auth_date,
    hash: user.hash
  };
};

const LoginContainer = () => {
  const dispatch = useDispatch();
  const widgetContainerRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const {
    auth: { login }
  } = Resources;

  const handleTelegramAuth = useCallback(
    (authData) => {
      const sanitized = sanitizeUser(authData);

      if (!sanitized) {
        return;
      }

      dispatch(setUser(sanitized));
    },
    [dispatch]
  );

  useEffect(() => {
    if (user) {
      return undefined;
    }

    window[TELEGRAM_CALLBACK_NAME] = handleTelegramAuth;

    const script = document.createElement('script');
    script.src = TELEGRAM_WIDGET_SRC;
    script.async = true;
    script.dataset.telegramLogin = login.botName.replace('@', '');
    script.dataset.size = 'large';
    script.dataset.userpic = 'false';
    script.dataset.requestAccess = 'write';
    script.dataset.onauth = TELEGRAM_CALLBACK_NAME;

    const container = widgetContainerRef.current;
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }

    return () => {
      if (window[TELEGRAM_CALLBACK_NAME]) {
        delete window[TELEGRAM_CALLBACK_NAME];
      }

      if (container) {
        container.innerHTML = '';
      }
    };
  }, [handleTelegramAuth, login.botName, user]);

  return (
    <div className="login-page">
      <div className="container login-page__container">
        <div className="login-card card">
          <div className="login-card__content">
            <h1>{login.title}</h1>
            <p className="login-card__description">{login.description}</p>
            <div className="login-card__info card">
              <h2>{login.instructionsTitle}</h2>
              <ul>
                {login.instructions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="login-card__privacy">{login.privacyNotice}</p>
          </div>
          <div className="login-card__action">
            {!user ? (
              <div className="login-widget">
                <h3>{login.widgetTitle}</h3>
                <p className="login-widget__bot">Бот: {login.botName}</p>
                <div ref={widgetContainerRef} className="login-widget__button" />
              </div>
            ) : (
              <div className="login-success card">
                <h3>{login.loggedInTitle}</h3>
                <p>{login.loggedInSubtitle}</p>
                <div className="login-success__profile">
                  {user.photoUrl ? (
                    <img src={user.photoUrl} alt={user.firstName} />
                  ) : (
                    <div className="login-success__avatar">
                      {user.firstName?.[0] ?? user.username?.[0] ?? '🚤'}
                    </div>
                  )}
                  <div>
                    <strong>
                      {[user.firstName, user.lastName].filter(Boolean).join(' ') ||
                        user.username ||
                        'Telegram користувач'}
                    </strong>
                    {user.username && <span>@{user.username}</span>}
                  </div>
                </div>
                <button type="button" className="button secondary" onClick={() => dispatch(clearUser())}>
                  {login.logoutCta}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;

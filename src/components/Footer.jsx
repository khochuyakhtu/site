import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="hy-footer">
    <div className="container hy-footer__layout">
      <div>
        <h3>🚤 Хочу Яхту</h3>
        <p>
          Спільнота ентузіастів Web3, які діляться знаннями та будують пасивний
          дохід на крипторинку.
        </p>
      </div>
      <div className="hy-footer__links">
        <div>
          <h4>Навігація</h4>
          <Link to="/">Головна</Link>
          <Link to="/blog">Блог</Link>
          <Link to="/earn">Earn</Link>
          <Link to="/launchpool">Launchpool</Link>
        </div>
        <div>
          <h4>Контакти</h4>
          <a href="mailto:crew@hochu-yacht.xyz">crew@hochu-yacht.xyz</a>
          <a href="https://t.me/hochu-yacht" target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a href="https://x.com/hochu-yacht" target="_blank" rel="noreferrer">
            X (Twitter)
          </a>
        </div>
      </div>
    </div>
    <div className="hy-footer__bottom">
      <div className="container">
        <small>© {new Date().getFullYear()} Хочу Яхту. Всі права захищені.</small>
      </div>
    </div>
  </footer>
);

export default Footer;

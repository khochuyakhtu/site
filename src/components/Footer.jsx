import { Link } from 'react-router-dom';
import { Resources } from '../resources/Resources.ts';
import './Footer.css';

const Footer = () => {
  const {
    shared: { navigation, contact },
    footer
  } = Resources;

  const copyright = footer.copyright.replace(
    '{year}',
    new Date().getFullYear().toString()
  );

  return (
    <footer className="hy-footer">
      <div className="container hy-footer__layout">
        <div>
          <h3>{footer.title}</h3>
          <p>{footer.description}</p>
        </div>
        <div className="hy-footer__links">
          <div>
            <h4>{footer.navigationTitle}</h4>
            <Link to="/">{navigation.home}</Link>
            <Link to="/blog">{navigation.blog}</Link>
            <Link to="/earn">{navigation.earn}</Link>
            <Link to="/launchpool">{navigation.launchpool}</Link>
          </div>
          <div>
            <h4>{footer.contactsTitle}</h4>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.telegram.url} target="_blank" rel="noreferrer">
              {contact.telegram.label}
            </a>
            <a href={contact.x.url} target="_blank" rel="noreferrer">
              {contact.x.label}
            </a>
          </div>
        </div>
      </div>
      <div className="hy-footer__bottom">
        <div className="container">
          <small>{copyright}</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

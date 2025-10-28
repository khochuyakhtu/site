import { Link } from 'react-router-dom';
import { Resources } from '../resources/Resources.ts';
import './HomeContainer.css';

const HomeContainer = () => {
  const {
    home: { hero, highlights, roadmap }
  } = Resources;

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero__layout">
          <div className="hero__content">
            <span className="badge">{hero.badge}</span>
            <h1>{hero.title}</h1>
            <p>{hero.description}</p>
            <div className="hero__cta">
              <Link className="button" to="/earn">
                {hero.primaryCta}
              </Link>
              <Link className="button secondary" to="/blog">
                {hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="hero__stats card">
            <h3>{hero.stats.heading}</h3>
            <ul>
              {hero.stats.items.map((item) => (
                <li key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container highlights">
        <h2 className="section-title">{highlights.title}</h2>
        <p className="section-description">{highlights.description}</p>
        <div className="grid highlights__grid">
          {highlights.cards.map((card) => (
            <article key={card.title} className="card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home__roadmap">
        <div className="container">
          <h2 className="section-title">{roadmap.title}</h2>
          <div className="roadmap card">
            {roadmap.items.map((item) => (
              <div key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContainer;

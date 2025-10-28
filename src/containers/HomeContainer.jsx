import { Link } from 'react-router-dom';
import './HomeContainer.css';

const HomeContainer = () => (
  <div className="home">
    <section className="hero">
      <div className="container hero__layout">
        <div className="hero__content">
          <span className="badge">Web3 Community</span>
          <h1>Хочу Яхту — клуб криптономадів, що інвестують у майбутнє</h1>
          <p>
            Акумулюємо найкращі можливості для пасивного доходу, ділимося альфа-
            ресерчем та створюємо інфраструктуру для росту капіталу спільноти.
          </p>
          <div className="hero__cta">
            <Link className="button" to="/earn">
              Переглянути Earn
            </Link>
            <Link className="button secondary" to="/blog">
              Читати блог
            </Link>
          </div>
        </div>
        <div className="hero__stats card">
          <h3>Станом на квітень 2024</h3>
          <ul>
            <li>
              <strong>4 200+</strong>
              <span>учасників спільноти</span>
            </li>
            <li>
              <strong>$12.5M</strong>
              <span>сукупного TVL у стратегіях</span>
            </li>
            <li>
              <strong>38</strong>
              <span>аналітичних звітів на місяць</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="container highlights">
      <h2 className="section-title">Що отримує член спільноти</h2>
      <p className="section-description">
        Ми формуємо нетворк, що дає доступ до приватних угод, спільних пулів
        ліквідності та експертних консультацій з управління ризиками.
      </p>
      <div className="grid highlights__grid">
        <article className="card">
          <h3>Приватний Launchpad</h3>
          <p>
            Доступ до угод на ранніх стадіях з ретельним юридичним та технічним
            дьюдилом.
          </p>
        </article>
        <article className="card">
          <h3>Аналітика 24/7</h3>
          <p>
            Slack-канал з алертами щодо стейкінгів, airdrop-кампаній та
            нестандартних рішень для збільшення APY.
          </p>
        </article>
        <article className="card">
          <h3>Програми наставництва</h3>
          <p>
            Професійні ментори з досвідом управління DeFi-портфелями та
            деривативами.
          </p>
        </article>
      </div>
    </section>

    <section className="home__roadmap">
      <div className="container">
        <h2 className="section-title">Дорожня карта 2024</h2>
        <div className="roadmap card">
          <div>
            <h4>Q2 • Launchpool Radar</h4>
            <p>
              Автоматизований трекер з push-нотифікаціями по ключових біржах та
              калькулятором ризик/нагорода.
            </p>
          </div>
          <div>
            <h4>Q3 • Community Fund</h4>
            <p>
              Запуск DAO-скарбниці для спільних інвестицій у прибуткові протоколи.
            </p>
          </div>
          <div>
            <h4>Q4 • Yacht Summit</h4>
            <p>
              Офлайн-подія в Середземноморʼї з партнерами бірж та фондами.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomeContainer;

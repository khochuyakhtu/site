import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { launchpoolStatuses } from '../resources/launchpoolCampaigns.js';
import {
  setStatus,
  setLaunchpoolExchange,
  setLaunchpoolQuery,
  setCalculatorValue
} from '../slices/launchpoolSlice.js';
import './LaunchpoolContainer.css';

const LaunchpoolContainer = () => {
  const dispatch = useDispatch();
  const { campaigns, filters, calculator } = useSelector(
    (state) => state.launchpool
  );

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchStatus =
        filters.status === 'Усі' || campaign.status === filters.status;
      const matchExchange =
        filters.exchange === 'Усі' || campaign.exchange === filters.exchange;
      const q = filters.query.trim().toLowerCase();
      const matchQuery =
        q.length === 0 ||
        campaign.project.toLowerCase().includes(q) ||
        campaign.lockAssets.some((asset) => asset.toLowerCase().includes(q));
      return matchStatus && matchExchange && matchQuery;
    });
  }, [campaigns, filters]);

  const forecast = useMemo(() => {
    const deposit = Number(calculator.deposit) || 0;
    const apy = Number(calculator.apy) || 0;
    const days = Number(calculator.durationDays) || 0;
    const profit = (deposit * apy * (days / 365)) / 100;
    return {
      deposit,
      profit,
      total: deposit + profit
    };
  }, [calculator]);

  return (
    <div className="container launchpool">
      <header className="launchpool__header">
        <div>
          <span className="badge">Launchpool центр</span>
          <h1>Моніторинг Launchpool</h1>
          <p>
            Відстежуйте активні та майбутні кампанії на різних біржах. Підберіть
            відповідні пропозиції та одразу порахуйте прогнозований прибуток.
          </p>
        </div>
        <aside className="launchpool__calculator card">
          <h3>Калькулятор прибутку</h3>
          <label>
            Депозит, $
            <input
              type="number"
              min="0"
              value={calculator.deposit}
              onChange={(event) =>
                dispatch(setCalculatorValue({ deposit: event.target.value }))
              }
            />
          </label>
          <label>
            Очікуваний APY, %
            <input
              type="number"
              min="0"
              step="0.1"
              value={calculator.apy}
              onChange={(event) =>
                dispatch(setCalculatorValue({ apy: event.target.value }))
              }
            />
          </label>
          <label>
            Тривалість, днів
            <input
              type="number"
              min="1"
              value={calculator.durationDays}
              onChange={(event) =>
                dispatch(
                  setCalculatorValue({ durationDays: event.target.value })
                )
              }
            />
          </label>
          <div className="launchpool__forecast">
            <div>
              <span>Очікуваний прибуток</span>
              <strong>${forecast.profit.toFixed(2)}</strong>
            </div>
            <div>
              <span>Підсумок</span>
              <strong>${forecast.total.toFixed(2)}</strong>
            </div>
          </div>
        </aside>
      </header>

      <section className="card launchpool__filters">
        <div className="launchpool__filters-grid">
          <label>
            Статус
            <select
              value={filters.status}
              onChange={(event) => dispatch(setStatus(event.target.value))}
            >
              <option value="Усі">Усі</option>
              {launchpoolStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label>
            Біржа
            <select
              value={filters.exchange}
              onChange={(event) =>
                dispatch(setLaunchpoolExchange(event.target.value))
              }
            >
              <option value="Усі">Усі</option>
              {[...new Set(campaigns.map((item) => item.exchange))].map(
                (exchange) => (
                  <option key={exchange} value={exchange}>
                    {exchange}
                  </option>
                )
              )}
            </select>
          </label>
          <label>
            Пошук за проектом або активами
            <input
              type="search"
              placeholder="Наприклад, Sui або BNB"
              value={filters.query}
              onChange={(event) =>
                dispatch(setLaunchpoolQuery(event.target.value))
              }
            />
          </label>
        </div>
      </section>

      <section className="launchpool__grid">
        {filteredCampaigns.map((campaign) => (
          <article key={campaign.id} className="card launchpool__card">
            <div className="launchpool__status">
              <span className="badge">{campaign.status}</span>
              <span>{campaign.exchange}</span>
            </div>
            <h3>{campaign.project}</h3>
            <p>
              APY до <strong>{campaign.roi}%</strong>. Локація активів:{' '}
              {campaign.lockAssets.join(', ')}
            </p>
            <footer>
              <span>
                {new Date(campaign.startDate).toLocaleDateString('uk-UA', {
                  month: 'short',
                  day: 'numeric'
                })}{' '}
                —
                {' '}
                {new Date(campaign.endDate).toLocaleDateString('uk-UA', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <button type="button" className="button secondary">
                Додати в трекер
              </button>
            </footer>
          </article>
        ))}
        {filteredCampaigns.length === 0 && (
          <div className="card launchpool__empty">
            <h3>Пропозицій не знайдено</h3>
            <p>Змініть фільтри, щоб побачити більше launchpool кампаній.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default LaunchpoolContainer;

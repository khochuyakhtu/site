import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { Resources, launchpoolStatuses } from '../resources/Resources.ts';
import {
  setStatus,
  setLaunchpoolExchange,
  setLaunchpoolQuery,
  setCalculatorValue,
  fetchLaunchpoolCampaigns
} from '../slices/launchpoolSlice.js';
import StatusMessage from '../components/StatusMessage.jsx';
import './LaunchpoolContainer.css';

const LaunchpoolContainer = () => {
  const dispatch = useDispatch();
  const { campaigns, filters, calculator, status, error, warnings, meta } = useSelector(
    (state) => state.launchpool
  );
  const { launchpool, shared } = Resources;
  const allOption = shared.allOption;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLaunchpoolCampaigns());
    }
  }, [status, dispatch]);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchStatus =
        filters.status === allOption || campaign.status === filters.status;
      const matchExchange =
        filters.exchange === allOption || campaign.exchange === filters.exchange;
      const q = filters.query.trim().toLowerCase();
      const matchQuery =
        q.length === 0 ||
        campaign.project.toLowerCase().includes(q) ||
        campaign.lockAssets.some((asset) => asset.toLowerCase().includes(q));
      return matchStatus && matchExchange && matchQuery;
    });
  }, [campaigns, filters, allOption]);

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

  const uniqueWarningExchanges = Array.from(
    new Set((warnings ?? []).map((warning) => warning.exchange).filter(Boolean))
  );
  const warningsDescription = uniqueWarningExchanges.length
    ? launchpool.apiStatus.warningsDescription.replace(
        '{exchanges}',
        uniqueWarningExchanges.join(', ')
      )
    : null;
  const warningItems = (warnings ?? []).map((warning) => {
    const prefix = warning.exchange ? `${warning.exchange}: ` : '';
    return `${prefix}${warning.message ?? launchpool.apiStatus.error}`;
  });

  const formattedUpdatedAt = meta?.updatedAt
    ? new Date(meta.updatedAt).toLocaleString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null;

  const formatDate = (value) => {
    if (!value) {
      return '—';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '—';
    }
    return date.toLocaleDateString('uk-UA', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container launchpool">
      <header className="launchpool__header">
        <div>
          <span className="badge">{launchpool.badge}</span>
          <h1>{launchpool.title}</h1>
          <p>{launchpool.description}</p>
        </div>
        <aside className="launchpool__calculator card">
          <h3>{launchpool.calculator.title}</h3>
          <label>
            {launchpool.calculator.depositLabel}
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
            {launchpool.calculator.apyLabel}
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
            {launchpool.calculator.durationLabel}
            <input
              type="number"
              min="1"
              value={calculator.durationDays}
              onChange={(event) =>
                dispatch(setCalculatorValue({ durationDays: event.target.value }))
              }
            />
          </label>
          <div className="launchpool__forecast">
            <div>
              <span>{launchpool.calculator.forecast.profit}</span>
              <strong>${forecast.profit.toFixed(2)}</strong>
            </div>
            <div>
              <span>{launchpool.calculator.forecast.total}</span>
              <strong>${forecast.total.toFixed(2)}</strong>
            </div>
          </div>
        </aside>
      </header>

      <section className="card launchpool__filters">
        <div className="launchpool__filters-grid">
          <label>
            {launchpool.filters.statusLabel}
            <select
              value={filters.status}
              onChange={(event) => dispatch(setStatus(event.target.value))}
            >
              <option value={allOption}>{allOption}</option>
              {launchpoolStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label>
            {launchpool.filters.exchangeLabel}
            <select
              value={filters.exchange}
              onChange={(event) =>
                dispatch(setLaunchpoolExchange(event.target.value))
              }
            >
              <option value={allOption}>{allOption}</option>
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
            {launchpool.filters.queryLabel}
            <input
              type="search"
              placeholder={launchpool.filters.queryPlaceholder}
              value={filters.query}
              onChange={(event) =>
                dispatch(setLaunchpoolQuery(event.target.value))
              }
            />
          </label>
        </div>
      </section>

      {(status === 'loading' || error || (warnings ?? []).length > 0) && (
        <section className="launchpool__alerts">
          {status === 'loading' && (
            <StatusMessage tone="info" title={launchpool.apiStatus.loading} />
          )}
          {error && (
            <StatusMessage
              tone="error"
              title={launchpool.apiStatus.error}
              description={error}
            />
          )}
          {(warnings ?? []).length > 0 && (
            <StatusMessage
              tone="warning"
              title={launchpool.apiStatus.warningsTitle}
              description={warningsDescription}
              items={warningItems}
            />
          )}
        </section>
      )}

      {formattedUpdatedAt && (
        <div className="launchpool__meta">
          <small>
            {launchpool.meta?.lastUpdatedPrefix}
            {formattedUpdatedAt}
          </small>
        </div>
      )}

      <section className="launchpool__grid">
        {filteredCampaigns.map((campaign) => (
          <article key={campaign.id} className="card launchpool__card">
            <div className="launchpool__status">
              <span className="badge">{campaign.status}</span>
              <span>{campaign.exchange}</span>
            </div>
            <h3>{campaign.project}</h3>
            <p>
              {launchpool.card.descriptionPrefix} <strong>{campaign.roi}%</strong>.{' '}
              {launchpool.card.assetsLabel}{' '}
              {Array.isArray(campaign.lockAssets) && campaign.lockAssets.length > 0
                ? campaign.lockAssets.join(', ')
                : '—'}
            </p>
            <footer>
              <span>
                {formatDate(campaign.startDate)} — {formatDate(campaign.endDate)}
              </span>
              <button type="button" className="button secondary">
                {launchpool.card.cta}
              </button>
            </footer>
          </article>
        ))}
        {filteredCampaigns.length === 0 && (
          <div className="card launchpool__empty">
            <h3>{launchpool.card.empty.title}</h3>
            <p>{launchpool.card.empty.description}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default LaunchpoolContainer;

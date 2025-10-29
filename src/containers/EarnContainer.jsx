import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import {
  Resources,
  exchanges,
  stakingTerms
} from '../resources/Resources.ts';
import {
  setExchange,
  setAsset,
  setMinApy,
  setTerm,
  resetEarnFilters,
  fetchEarnProducts,
  fetchStakingPrograms
} from '../slices/earnSlice.js';
import StatusMessage from '../components/StatusMessage.jsx';
import './EarnContainer.css';

const EarnContainer = () => {
  const dispatch = useDispatch();
  const { products, filters, status, error, warnings, meta, staking } = useSelector(
    (state) => state.earn
  );
  const { earn, shared } = Resources;
  const allOption = shared.allOption;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEarnProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (staking.status === 'idle') {
      dispatch(fetchStakingPrograms());
    }
  }, [staking.status, dispatch]);

  const filteredProducts = useMemo(() => {
    const minApyValue = Number(filters.minApy) || 0;
    return (products ?? [])
      .filter((product) => {
        const matchExchange =
          filters.exchange === allOption || product.exchange === filters.exchange;
        const matchAsset =
          filters.asset.trim().length === 0 ||
          product.asset.toLowerCase().includes(filters.asset.toLowerCase());
        const matchApy = product.apy >= minApyValue;
        const matchTerm = filters.term === allOption || product.term === filters.term;
        return matchExchange && matchAsset && matchApy && matchTerm;
      })
      .sort((a, b) => b.apy - a.apy);
  }, [products, filters, allOption]);

  const aggregated = useMemo(() => {
    const totalTvl = filteredProducts.reduce((sum, item) => sum + (item.tvl || 0), 0);
    const avgApy =
      filteredProducts.reduce((sum, item) => sum + (item.apy || 0), 0) /
      (filteredProducts.length || 1);
    return {
      totalTvl,
      avgApy
    };
  }, [filteredProducts]);

  const datasetCountText = earn.table.datasetCount
    .replace('{current}', filteredProducts.length.toString())
    .replace('{total}', (meta?.total ?? products.length).toString());

  const formattedUpdatedAt = meta?.updatedAt
    ? new Date(meta.updatedAt).toLocaleString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null;

  const uniqueWarningExchanges = Array.from(
    new Set((warnings ?? []).map((warning) => warning.exchange).filter(Boolean))
  );
  const warningsDescription = uniqueWarningExchanges.length
    ? earn.apiStatus.warningsDescription.replace(
        '{exchanges}',
        uniqueWarningExchanges.join(', ')
      )
    : null;

  const warningItems = (warnings ?? []).map((warning) => {
    const prefix = warning.exchange ? `${warning.exchange}: ` : '';
    return `${prefix}${warning.message ?? earn.apiStatus.error}`;
  });

  const stakingWarningExchanges = Array.from(
    new Set((staking.warnings ?? []).map((warning) => warning.exchange).filter(Boolean))
  );
  const stakingWarningDescription = stakingWarningExchanges.length
    ? earn.apiStatus.warningsDescription.replace(
        '{exchanges}',
        stakingWarningExchanges.join(', ')
      )
    : null;
  const stakingWarningItems = (staking.warnings ?? []).map((warning) => {
    const prefix = warning.exchange ? `${warning.exchange}: ` : '';
    return `${prefix}${warning.message ?? earn.apiStatus.error}`;
  });

  return (
    <div className="container earn">
      <header className="earn__header">
        <div>
          <span className="badge">{earn.badge}</span>
          <h1>{earn.title}</h1>
          <p>{earn.description}</p>
        </div>
        <aside className="earn__summary card">
          <h3>{earn.summaryTitle}</h3>
          <div>
            <span>{earn.summaryAverageLabel}</span>
            <strong>{aggregated.avgApy.toFixed(1)}%</strong>
          </div>
          <div>
            <span>{earn.summaryTvlLabel}</span>
            <strong>${aggregated.totalTvl}K</strong>
          </div>
        </aside>
      </header>

      {(status === 'loading' || error || (warnings ?? []).length > 0) && (
        <section className="earn__status">
          {status === 'loading' && (
            <StatusMessage tone="info" title={earn.apiStatus.loading} />
          )}
          {error && (
            <StatusMessage tone="error" title={earn.apiStatus.error} description={error} />
          )}
          {(warnings ?? []).length > 0 && (
            <StatusMessage
              tone="warning"
              title={earn.apiStatus.warningsTitle}
              description={warningsDescription}
              items={warningItems}
            />
          )}
        </section>
      )}

      <section className="card earn__filters">
        <div className="earn__filters-grid">
          <label>
            {earn.filters.exchangeLabel}
            <select
              value={filters.exchange}
              onChange={(event) => dispatch(setExchange(event.target.value))}
            >
              <option value={allOption}>{allOption}</option>
              {exchanges.map((exchange) => (
                <option key={exchange} value={exchange}>
                  {exchange}
                </option>
              ))}
            </select>
          </label>
          <label>
            {earn.filters.assetLabel}
            <input
              type="text"
              placeholder={earn.filters.assetPlaceholder}
              value={filters.asset}
              onChange={(event) => dispatch(setAsset(event.target.value))}
            />
          </label>
          <label>
            {earn.filters.minApyLabel}
            <input
              type="number"
              min="0"
              step="0.1"
              value={filters.minApy}
              onChange={(event) => dispatch(setMinApy(event.target.value))}
            />
          </label>
          <label>
            {earn.filters.termLabel}
            <select
              value={filters.term}
              onChange={(event) => dispatch(setTerm(event.target.value))}
            >
              <option value={allOption}>{allOption}</option>
              {stakingTerms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="button"
          className="button secondary"
          onClick={() => dispatch(resetEarnFilters())}
        >
          {earn.filters.reset}
        </button>
      </section>

      <section className="card earn__table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{earn.table.headers.exchange}</th>
              <th>{earn.table.headers.asset}</th>
              <th>{earn.table.headers.apy}</th>
              <th>{earn.table.headers.term}</th>
              <th>{earn.table.headers.tvl}</th>
              <th>{earn.table.headers.risk}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.exchange}</td>
                <td>{product.asset}</td>
                <td>{product.apy}%</td>
                <td>{product.term}</td>
                <td>{product.tvl}</td>
                <td>{product.risk}</td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="earn__empty">
                {earn.table.empty}
              </td>
            </tr>
          )}
        </tbody>
        </table>
        <footer className="earn__dataset">
          <small>{earn.table.datasetNote}</small>
          <small>{datasetCountText}</small>
          {formattedUpdatedAt && (
            <small>
              {earn.table.lastUpdatedPrefix}
              {formattedUpdatedAt}
            </small>
          )}
        </footer>
      </section>

      <section className="card earn__staking">
        <div className="earn__staking-header">
          <h3>{earn.stakingHighlights.title}</h3>
          <p>{earn.stakingHighlights.description}</p>
        </div>
        <div className="earn__staking-body">
          {staking.status === 'loading' && (
            <StatusMessage tone="info" title={earn.apiStatus.loading} />
          )}
          {staking.error && (
            <StatusMessage tone="error" title={earn.apiStatus.error} description={staking.error} />
          )}
          {(staking.warnings ?? []).length > 0 && (
            <StatusMessage
              tone="warning"
              title={earn.apiStatus.warningsTitle}
              description={stakingWarningDescription}
              items={stakingWarningItems}
            />
          )}
          {staking.status !== 'loading' && staking.items.length === 0 && !staking.error && (
            <p className="earn__staking-empty">{earn.stakingHighlights.empty}</p>
          )}
          {staking.items.length > 0 && (
            <ul className="earn__staking-list">
              {staking.items.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.asset}</strong>
                    <span>{item.exchange}</span>
                  </div>
                  <div>
                    <span>{item.lockPeriodDays ? `${item.lockPeriodDays} днів` : 'Гнучкий'}</span>
                    <strong>{item.apy}%</strong>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default EarnContainer;

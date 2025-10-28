import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  Resources,
  exchanges,
  stakingTerms,
  earnProducts as allProducts
} from '../resources/Resources.ts';
import {
  setExchange,
  setAsset,
  setMinApy,
  setTerm,
  resetEarnFilters
} from '../slices/earnSlice.js';
import './EarnContainer.css';

const EarnContainer = () => {
  const dispatch = useDispatch();
  const { products, filters } = useSelector((state) => state.earn);
  const { earn, shared } = Resources;
  const allOption = shared.allOption;

  const filteredProducts = useMemo(() => {
    const minApyValue = Number(filters.minApy) || 0;
    return products
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
    const totalTvl = filteredProducts.reduce((sum, item) => sum + item.tvl, 0);
    const avgApy =
      filteredProducts.reduce((sum, item) => sum + item.apy, 0) /
      (filteredProducts.length || 1);
    return {
      totalTvl,
      avgApy
    };
  }, [filteredProducts]);

  const datasetCountText = earn.table.datasetCount
    .replace('{current}', filteredProducts.length.toString())
    .replace('{total}', allProducts.length.toString());

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
        </footer>
      </section>
    </div>
  );
};

export default EarnContainer;

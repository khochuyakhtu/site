import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  exchanges,
  stakingTerms,
  earnProducts as allProducts
} from '../resources/earnProducts.js';
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

  const filteredProducts = useMemo(() => {
    const minApyValue = Number(filters.minApy) || 0;
    return products
      .filter((product) => {
        const matchExchange =
          filters.exchange === 'Усі' || product.exchange === filters.exchange;
        const matchAsset =
          filters.asset.trim().length === 0 ||
          product.asset.toLowerCase().includes(filters.asset.toLowerCase());
        const matchApy = product.apy >= minApyValue;
        const matchTerm =
          filters.term === 'Усі' || product.term === filters.term;
        return matchExchange && matchAsset && matchApy && matchTerm;
      })
      .sort((a, b) => b.apy - a.apy);
  }, [products, filters]);

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

  return (
    <div className="container earn">
      <header className="earn__header">
        <div>
          <span className="badge">Стратегії доходу</span>
          <h1>Earn панель</h1>
          <p>
            Актуальні пропозиції стейкінгу з централізованих бірж. Фільтруйте за
            біржею, монетою, мінімальним APY та тривалістю блокування.
          </p>
        </div>
        <aside className="earn__summary card">
          <h3>Зведена статистика</h3>
          <div>
            <span>Середній APY</span>
            <strong>{aggregated.avgApy.toFixed(1)}%</strong>
          </div>
          <div>
            <span>Сукупний TVL</span>
            <strong>${aggregated.totalTvl}K</strong>
          </div>
        </aside>
      </header>

      <section className="card earn__filters">
        <div className="earn__filters-grid">
          <label>
            Біржа
            <select
              value={filters.exchange}
              onChange={(event) => dispatch(setExchange(event.target.value))}
            >
              <option value="Усі">Усі</option>
              {exchanges.map((exchange) => (
                <option key={exchange} value={exchange}>
                  {exchange}
                </option>
              ))}
            </select>
          </label>
          <label>
            Монета
            <input
              type="text"
              placeholder="Наприклад, SOL"
              value={filters.asset}
              onChange={(event) => dispatch(setAsset(event.target.value))}
            />
          </label>
          <label>
            Мінімальний APY
            <input
              type="number"
              min="0"
              step="0.1"
              value={filters.minApy}
              onChange={(event) => dispatch(setMinApy(event.target.value))}
            />
          </label>
          <label>
            Термін
            <select
              value={filters.term}
              onChange={(event) => dispatch(setTerm(event.target.value))}
            >
              <option value="Усі">Усі</option>
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
          Скинути фільтри
        </button>
      </section>

      <section className="card earn__table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Біржа</th>
              <th>Монета</th>
              <th>APY</th>
              <th>Термін</th>
              <th>TVL (тис.$)</th>
              <th>Ризик</th>
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
                  За вибраними параметрами немає пропозицій.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <footer className="earn__dataset">
          <small>
            Дані оновлені вручну для демо. У продакшені інтегруйте API бірж для
            отримання реальних значень.
          </small>
          <small>
            Показано {filteredProducts.length} з {allProducts.length} продуктів.
          </small>
        </footer>
      </section>
    </div>
  );
};

export default EarnContainer;

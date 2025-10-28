import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../slices/themeSlice.js';

const ThemeToggle = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="button secondary"
      onClick={() => dispatch(toggleTheme())}
    >
      {mode === 'light' ? '🌙 Темна' : '☀️ Світла'}
    </button>
  );
};

export default ThemeToggle;

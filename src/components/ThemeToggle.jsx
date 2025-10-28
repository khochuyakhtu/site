import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../slices/themeSlice.js';
import { Resources } from '../resources/Resources.ts';

const ThemeToggle = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="button secondary"
      onClick={() => dispatch(toggleTheme())}
    >
      {mode === 'light'
        ? Resources.shared.themeToggle.dark
        : Resources.shared.themeToggle.light}
    </button>
  );
};

export default ThemeToggle;

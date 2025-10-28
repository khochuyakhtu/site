import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomeContainer from './containers/HomeContainer.jsx';
import BlogContainer from './containers/BlogContainer.jsx';
import EarnContainer from './containers/EarnContainer.jsx';
import LaunchpoolContainer from './containers/LaunchpoolContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';

const App = () => {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/blog" element={<BlogContainer />} />
          <Route path="/earn" element={<EarnContainer />} />
          <Route path="/launchpool" element={<LaunchpoolContainer />} />
          <Route path="/login" element={<LoginContainer />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;

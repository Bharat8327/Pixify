import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store/store.js';
import { useEffect } from 'react';

// Theme Wrapper Component
function ThemeWrapper() {
  const theme = useSelector((state) => state.appconfig.theme);

  useEffect(() => {
    document.body.className = theme
      ? 'bg-black text-white'
      : 'bg-white text-black';
  }, [theme]);
  return <App />;
}

// Render the App
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  </HashRouter>,
);

import React, { useCallback, useState } from 'react';
import './App.css';
import EsriMap from "./EsriMap";

function App () {
  const [theme, setTheme] = useState('light');
  const [mapLoaded, setMapLoaded] = useState(false);
  const onMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);
  const switchTheme = useCallback(e => {
    setTheme(e.target.dataset.theme);
  }, []);
  const appClassName = `App ${theme === "dark" ? "dark" : ""}`;

  return (
    <div className={appClassName}>
      <div>
        <label>Theme: </label>
        <button
          onClick={switchTheme}
          data-theme="light"
          disabled={!mapLoaded}
        >
          Light
        </button>
        <button
          onClick={switchTheme}
          data-theme="dark"
          disabled={!mapLoaded}
        >
          Dark
        </button>
      </div>
      <EsriMap theme={theme} onLoad={onMapLoad} />
    </div>
  );
}

export default App;

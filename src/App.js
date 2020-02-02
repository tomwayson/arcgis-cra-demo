import React from 'react';
import './App.css';
import EsriMap from "./EsriMap";

class App extends React.Component {
  state = {
    theme: "light",
    mapLoaded: false
  };
  switchTheme = e => {
    this.setState({ theme: e.target.dataset.theme });
  };
  onMapLoad = () => {
    this.setState({ mapLoaded: true });
  };
  render() {
    const appClassName = `App ${this.state.theme === "dark" ? "dark" : ""}`;
    return (
      <div className={appClassName}>
        <div>
          <label>Theme: </label>
          <button
            onClick={this.switchTheme}
            data-theme="light"
            disabled={!this.state.mapLoaded}
          >
            Light
          </button>
          <button
            onClick={this.switchTheme}
            data-theme="dark"
            disabled={!this.state.mapLoaded}
          >
            Dark
          </button>
        </div>
        <EsriMap theme={this.state.theme} onLoad={this.onMapLoad} />
      </div>
    );
  }
}

export default App;

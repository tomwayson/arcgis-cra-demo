import React from "react";
import "./EsriMap.css";
import { loadMap } from "./utils/map";

function themeToBasemap(theme) {
  return theme === "light" ? "gray-vector" : "dark-gray-vector";
}

class EsriMap extends React.Component {
  constructor(props) {
    super(props);
    // get a reference to the div to use as the view's container
    this.mapDiv = React.createRef();
  }

  // load the ArcGIS JS API and map when the component mounts
  componentDidMount() {
    const { theme, onLoad } = this.props;
    const container = this.mapDiv.current;
    const basemap = themeToBasemap(theme);
    loadMap(container, basemap).then(view => {
      // we need a reference to the view in other lifecycle methods
      this._view = view;
      // let the app know the map has loaded
      onLoad && onLoad();
    });
  }

  // update the basemap when the theme changes
  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      if (this._view) {
        this._view.map.basemap = themeToBasemap(this.props.theme);
      }
    }
  }

  // destroy the view and map to prevent memory leaks
  componentWillUnmount() {
    if (this._view) {
      this._view.container = null;
      delete this._view;
    }
  }

  // render a div to use as the view's container
  render() {
    return <div className="esri-map" ref={this.mapDiv} />;
  }
}

export default EsriMap;

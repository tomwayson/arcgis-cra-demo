import React, { useRef, useEffect } from "react";
import "./EsriMap.css";
import { loadMap } from "./utils/map";

function themeToBasemap(theme) {
  return theme === "light" ? "gray-vector" : "dark-gray-vector";
}

function EsriMap ({ theme, onLoad }) {
  // get a reference to the div to use as the view's container
  const mapDiv = useRef(null);
  // need a reference for the view as well since we don't have instance fields
  // see: https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
  const viewRef = useRef(null);

  // load the ArcGIS JS API and map when the component mounts
  useEffect(() => {
    // hooks require inline functions in order to use async/await
    async function initMap () {
      // we need a reference to the view in other hooks
      viewRef.current = await loadMap(mapDiv.current, themeToBasemap(theme));
      // let the app know the map has loaded
      onLoad && onLoad();
    }
    initMap();
    // destroy the view and map to prevent memory leaks
    // similar to componentWillUnmount()
    return function destroyMapView() {
      let _view = viewRef.current;
      if (_view) {
        _view = _view.container = null;
      }
    }
  }, []); // causes this to only run once, similar to componentWillMount()

  // update the basemap when the theme changes
  useEffect(() => {
    const _view = viewRef.current;
    if (_view) {
      _view.map.basemap = themeToBasemap(theme);
    }
  }, [theme]);

  // render a div to use as the view's container
  return <div className="esri-map" ref={mapDiv} />;
}

export default EsriMap;

import React, { useEffect, useRef, useState } from "react";
import "./EsriMap.css";
import { loadMap } from "./utils/map";

function themeToBasemap(theme) {
  return theme === "light" ? "gray-vector" : "dark-gray-vector";
}

function EsriMap ({ theme, onLoad }) {
  // get a reference to the div to use as the view's container
  const mapDiv = useRef(null);
  // we'll hold a reference to the map view in state
  const [view, setView] = useState(null);
  // need initial prop values when loading the map (see below)
  const initialProps = useRef({ theme });

  // load the ArcGIS JS API and map when the component mounts
  useEffect(() => {
    // we need a closure scope so we can access the view in destroyView()
    let _view;
    // hooks require inline functions in order to use async/await
    async function initMap ({ theme }) {
      // we need a reference to the view in other hooks
      _view = await loadMap(mapDiv.current, themeToBasemap(theme));
      setView(_view);
    }
    // we can't use the props directly in this hook w/o depending on them
    // and we can't depend on them if we want this hook to only run once
    // so instead we get initial prop values via a ref
    // see: https://github.com/facebook/react/issues/15865#issuecomment-540715333
    initMap(initialProps.current);
    // destroy the view and map to prevent memory leaks
    // similar to componentWillUnmount()
    return function destroyView() {
      if (_view) {
        _view = _view.container = null;
      }
    }
  }, []); // causes this to only run once, similar to componentWillMount()

  // update the basemap when the theme changes
  useEffect(() => {
    if (view) {
      view.map.basemap = themeToBasemap(theme);
    }
  }, [view, theme]);

  // let the app know the map has loaded
  useEffect(() => {
    if (view && onLoad) {
      onLoad();
    }
  }, [view, onLoad]);

  // render a div to use as the view's container
  return <div className="esri-map" ref={mapDiv} />;
}

export default EsriMap;

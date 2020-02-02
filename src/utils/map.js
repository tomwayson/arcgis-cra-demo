import { loadModules } from "esri-loader";

export function loadMap(container, basemap) {
  return loadModules(
    ["esri/Map", "esri/views/MapView"],
    // this stylesheet is only loaded once
    { css: true }
  ).then(([Map, MapView]) => {
    const map = new Map({ basemap });
    const view = new MapView({
      container,
      map,
      zoom: 4,
      center: [15, 65]
    });
    return view;
  });
}

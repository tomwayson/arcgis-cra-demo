import { loadModules } from "esri-loader";

export async function loadMap(container, basemap) {
  const [Map, MapView] = await loadModules(
    ["esri/Map", "esri/views/MapView"],
    // this stylesheet is only loaded once
    { css: true }
  );
  const map = new Map({ basemap });
  const view = new MapView({
    container,
    map,
    zoom: 4,
    center: [15, 65]
  });
  return view;
}
